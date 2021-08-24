import { IGNORED_OFFSETS } from './ignoredCompressionOffsets';

/**
 * based on code written for NLZ-GBA, which is a tile viewer tool created by Nintenlord.
 * https://www.romhacking.net/utilities/529/
 */

type TilePage = {
	address: number;
	tiles: Array<number[]>;
	compressedLength: number;
};

const SCAN_DEPTH = 4;
const BLOCK_SIZE = 8;

function canBeUncompressed(rom: Uint8Array, offset: number): boolean {
	if (rom[offset++] !== 0x10) {
		return false;
	}

	const maxLength = rom.length - offset;

	let positionUncomp = 0;
	let length = 0;

	for (let i = 0; i < 3; ++i) {
		length += rom[offset++] << (i * 8);
	}

	if (length > maxLength) {
		return false;
	}

	while (positionUncomp < length) {
		let isCompressed = rom[offset++];

		for (let i = 0; i < BLOCK_SIZE; ++i) {
			if ((isCompressed & 0x80) !== 0) {
				const amountToCopy = 3 + (rom[offset] >> 4);
				let copyPosition = 1;
				copyPosition += (rom[offset++] & 0xf) << 8;
				copyPosition += rom[offset++];

				if (copyPosition > positionUncomp) {
					return false;
				}

				positionUncomp += amountToCopy;
			} else {
				offset++;
				positionUncomp++;
			}

			isCompressed <<= 1;

			if (positionUncomp >= length) {
				break;
			}
		}
	}

	return true;
}

function getCompressionOffsets(rom: Uint8Array): number[] {
	const offsets = [];

	for (let i = 0; i < rom.length; i += SCAN_DEPTH) {
		if (rom[i] === 0x10) {
			if (canBeUncompressed(rom, i) && !IGNORED_OFFSETS.includes(i)) {
				offsets.push(i);
			}
		}
	}

	return offsets;
}

function decompress(
	rom: Uint8Array,
	offset: number
): { data: number[]; endOffset: number } | null {
	const decompressedData: number[] = [];

	if (rom[offset] !== 0x10) {
		throw new Error(
			`decompress called, but this offset is not the start of a compression run. offset: ${offset.toString(
				16
			)}, value: ${rom[offset].toString(16)}`
		);
	} else {
		offset++;
	}

	let positionUncomp = 0;
	const length = rom[offset++] + (rom[offset++] << 8) + (rom[offset++] << 16);

	while (positionUncomp < length) {
		let isCompressed = rom[offset++];

		for (let i = 0; i < BLOCK_SIZE; ++i) {
			if ((isCompressed & 0x80) !== 0) {
				const amountToCopy = 3 + (rom[offset] >> 4);
				let copyPosition = 1;
				copyPosition += (rom[offset++] & 0xf) << 8;
				copyPosition += rom[offset++];

				if (copyPosition > length) {
					console.error('decompress: overflow (copyPosition > length)');
					return null;
				}

				for (let u = 0; u < amountToCopy; ++u) {
					decompressedData[positionUncomp] =
						decompressedData[
							positionUncomp - u - copyPosition + (u % copyPosition)
						];
					positionUncomp++;
				}
			} else {
				decompressedData[positionUncomp++] = rom[offset++];
			}

			if (positionUncomp >= length) {
				break;
			}

			isCompressed <<= 1;
		}
	}

	// massage empty cells into zero. this let's us use a normal array
	// instead of Uint8Array, and thus not need to worry about sizing it
	for (let i = 0; i < decompressedData.length; ++i) {
		decompressedData[i] = decompressedData[i] || 0;
	}

	return { data: decompressedData, endOffset: offset };
}

function getTiles(
	rom: Uint8Array,
	offset: number
): { tiles: Array<number[]>; compressedLength: number } {
	const view = new DataView(rom.buffer);
	const length = view.getUint32(offset);

	if (length < 1) {
		return { tiles: [], compressedLength: 0 };
	}

	const uncompressedDataResult = decompress(rom, offset);

	if (!uncompressedDataResult) {
		return { tiles: [], compressedLength: 0 };
	}

	const { data: uncompressedData, endOffset } = uncompressedDataResult;

	const tiles: Array<number[]> = [];

	for (let i = 0; i < uncompressedData.length; i += 0x20) {
		tiles.push(uncompressedData.slice(i, i + 0x20));
	}

	return { tiles, compressedLength: endOffset - offset };
}

function extractCompressedTilesFromRom(rom: Uint8Array): TilePage[] {
	const compressionOffsets = getCompressionOffsets(rom);

	return compressionOffsets.reduce<TilePage[]>((building, address) => {
		const tileResult = getTiles(rom, address);

		if (tileResult.tiles.length < 2) {
			return building;
		}

		return building.concat({
			address,
			...tileResult,
		});
	}, []);
}

export { extractCompressedTilesFromRom, decompress };
export type { TilePage };
