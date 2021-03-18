import memoize from 'lodash/memoize';
import { ExtractedResource } from '../resources';
import { decompress } from './extractTilesFromRom';

const memoDecompress = memoize(decompress, (rom, offset) => offset);

const BYTES_PER_TILE = 32;

const DEFAULT_PALETTE: number[] = (function () {
	let p = [];
	for (let i = 0; i < 16; ++i) {
		p[i] = 255 * (i / 15);
	}

	return p;
})();

function tileToDataUrl(tileData: number[][][], palette: number[]): string {
	const canvas = document.createElement('canvas');
	canvas.height = tileData.length * 8;
	canvas.width = tileData[0].length * 8;
	const context = canvas.getContext('2d')!;

	for (let y = 0; y < tileData.length; ++y) {
		for (let x = 0; x < tileData[y].length; ++x) {
			const tile = tileData[y][x];
			const imageData = context.getImageData(x * 8, y * 8, 8, 8);

			for (let p = 0; p < tile.length; ++p) {
				const lowerPixel = (tile[p] >> 4) & 0xf;
				const upperPixel = tile[p] & 0xf;

				imageData.data[p * 8 + 0] = palette[upperPixel];
				imageData.data[p * 8 + 1] = palette[upperPixel];
				imageData.data[p * 8 + 2] = palette[upperPixel];
				imageData.data[p * 8 + 3] = upperPixel === 0 ? 0 : 255;

				imageData.data[p * 8 + 4] = palette[lowerPixel];
				imageData.data[p * 8 + 5] = palette[lowerPixel];
				imageData.data[p * 8 + 6] = palette[lowerPixel];
				imageData.data[p * 8 + 7] = lowerPixel === 0 ? 0 : 255;
			}

			context.putImageData(imageData, x * 8, y * 8);
		}
	}

	return canvas.toDataURL();
}

async function extractResource(
	rom: Uint8Array,
	resource: ExtractedResource
): Promise<void> {
	const offsetData = memoDecompress(rom, resource.romOffset);

	if (!offsetData) {
		throw new Error(
			`extractResource: romOffset does not yield tile data: ${resource.romOffset}`
		);
	}

	const tileData = resource.tiles.map((tileIndexRow) => {
		return tileIndexRow.map((tileIndex) =>
			offsetData.slice(
				tileIndex * BYTES_PER_TILE,
				(tileIndex + 1) * BYTES_PER_TILE
			)
		);
	});

	const dataUrl = tileToDataUrl(tileData, resource.palette ?? DEFAULT_PALETTE);

	resource.url = dataUrl;
}

function cleanup() {
	memoDecompress.cache.clear?.();
}

export { extractResource, cleanup };
