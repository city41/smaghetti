import { FIRST_LEVEL_NAME_OFFSET } from '../../scripts/wiiu/constants';
import {
	ROOM_OBJECT_HEADER_SIZE_IN_BYTES,
	ROOM_OBJECT_POINTERS,
} from './constants';
import { LEVEL_1_1_OBJECT_OFFSET } from './overwrite1_1';
import { MAX_LEVEL_NAME_SIZE } from './typesAndConstants';

const IPS_HEADER = 'PATCH'.split('').map((c) => c.charCodeAt(0));
const IPS_EOF = 'EOF'.split('').map((c) => c.charCodeAt(0));

function toBytes(num: number, byteCount: number): number[] {
	const bytes = [];

	for (let i = 0; i < byteCount; ++i) {
		const byte = num & 0xff;
		bytes.push(byte);
		num = num >> 8;
	}

	return bytes.reverse();
}

function pad(a: number[], size: number): number[] {
	const paddingSize = size - a.length;
	const padding = new Array(paddingSize).fill(0);

	return a.concat(padding);
}

export function createOverwrite1_1IPSPatch(level: Uint8Array): Uint8Array {
	const levelView = new DataView(level.buffer);

	const levelObjectOffset =
		levelView.getUint16(ROOM_OBJECT_POINTERS[0], true) +
		ROOM_OBJECT_HEADER_SIZE_IN_BYTES;

	const objectBytes = [];

	let i = 0;

	while (level[levelObjectOffset + i] !== 0xff) {
		objectBytes.push(level[levelObjectOffset + i]);
		++i;
	}

	objectBytes.push(0xff);

	const ipsData = [
		...IPS_HEADER,
		...toBytes(LEVEL_1_1_OBJECT_OFFSET, 3),
		...toBytes(objectBytes.length, 2),
		...objectBytes,
		...IPS_EOF,
	];

	return new Uint8Array(ipsData);
}

export function createVCIPSPatch(
	compressedLevels: Uint8Array[],
	nameBinaries: number[][]
): Uint8Array {
	if (compressedLevels.length !== nameBinaries.length) {
		throw new Error(
			`createVCIPSPatch, different number of levels (${compressedLevels.length}), vs names (${nameBinaries.length})`
		);
	}

	let ipsData = [...IPS_HEADER];

	for (let i = 0; i < compressedLevels.length; ++i) {
		const compressedLevel = compressedLevels[i];
		const nameAsBinary = nameBinaries[i];

		if (nameAsBinary.length < MAX_LEVEL_NAME_SIZE) {
			nameAsBinary.push(0xff);

			while (nameAsBinary.length < MAX_LEVEL_NAME_SIZE) {
				nameAsBinary.push(0);
			}
		}

		const levelNameTablePatch = [
			...toBytes(FIRST_LEVEL_NAME_OFFSET + MAX_LEVEL_NAME_SIZE * i, 3),
			...toBytes(MAX_LEVEL_NAME_SIZE, 2),
			...nameAsBinary,
		];

		const compressedLevelPatch = [
			...toBytes(0x400008 + 0x800 * i, 3),
			...toBytes(0x800, 2),
			...pad(Array.from(compressedLevel), 0x800),
		];

		ipsData = [...ipsData, ...levelNameTablePatch, ...compressedLevelPatch];
	}

	ipsData = [...ipsData, ...IPS_EOF];

	return new Uint8Array(ipsData);
}
