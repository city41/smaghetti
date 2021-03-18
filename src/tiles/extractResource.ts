import memoize from 'lodash/memoize';
import { ExtractedResource, TileExtractionSpec } from '../resources';
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

type TileExtractionSpecWithData = TileExtractionSpec & { data: number[] };

function drawTile(
	tile: TileExtractionSpecWithData,
	palette: number[]
): HTMLCanvasElement {
	const canvas = document.createElement('canvas');
	canvas.width = 8;
	canvas.height = 8;
	const context = canvas.getContext('2d')!;

	const imageData = context.getImageData(0, 0, 8, 8);

	for (let p = 0; p < tile.data.length; ++p) {
		const lowerPixel = (tile.data[p] >> 4) & 0xf;
		const upperPixel = tile.data[p] & 0xf;

		imageData.data[p * 8 + 0] = palette[upperPixel];
		imageData.data[p * 8 + 1] = palette[upperPixel];
		imageData.data[p * 8 + 2] = palette[upperPixel];
		imageData.data[p * 8 + 3] = upperPixel === 0 ? 0 : 255;

		imageData.data[p * 8 + 4] = palette[lowerPixel];
		imageData.data[p * 8 + 5] = palette[lowerPixel];
		imageData.data[p * 8 + 6] = palette[lowerPixel];
		imageData.data[p * 8 + 7] = lowerPixel === 0 ? 0 : 255;
	}

	context.putImageData(imageData, 0, 0);

	return canvas;
}

function flip(
	src: HTMLCanvasElement,
	flip: TileExtractionSpec['flip']
): HTMLCanvasElement {
	if (!flip) {
		return src;
	}

	const canvas = document.createElement('canvas');
	canvas.width = src.width;
	canvas.height = src.height;
	const context = canvas.getContext('2d')!;

	switch (flip) {
		case 'h':
			context.translate(src.width, 0);
			context.scale(-1, 1);
			break;
		case 'v':
			context.translate(0, src.height);
			context.scale(1, -1);
			break;
		case 'hv':
			context.translate(src.width, src.height);
			context.scale(-1, -1);
			break;
	}

	context.drawImage(src, 0, 0);

	return canvas;
}

function tileToDataUrl(
	tileData: Array<Array<TileExtractionSpecWithData>>,
	palette: number[]
): string {
	const canvas = document.createElement('canvas');
	canvas.height = tileData.length * 8;
	canvas.width = tileData[0].length * 8;
	const context = canvas.getContext('2d')!;

	for (let y = 0; y < tileData.length; ++y) {
		for (let x = 0; x < tileData[y].length; ++x) {
			const spec = tileData[y][x];

			let tileCanvas = drawTile(spec, palette);
			tileCanvas = flip(tileCanvas, spec.flip);

			context.drawImage(tileCanvas, x * 8, y * 8, 8, 8);
		}
	}

	return canvas.toDataURL();
}

async function extractResource(
	rom: Uint8Array,
	resource: ExtractedResource
): Promise<void> {
	const tileData: Array<Array<TileExtractionSpecWithData>> = resource.tiles.map(
		(tileIndexRow) => {
			return tileIndexRow.map((t) => {
				const tileIndex = typeof t === 'number' ? t : t.tileIndex;
				const romOffset =
					typeof t === 'number' ? resource.romOffset : t.romOffset;

				if (typeof romOffset !== 'number') {
					throw new Error('extractResource: romOffset not specified');
				}

				const offsetData = memoDecompress(rom, romOffset);

				if (!offsetData) {
					throw new Error(
						`extractResource: romOffset does not yield tile data: ${romOffset}`
					);
				}

				const data = offsetData.slice(
					tileIndex * BYTES_PER_TILE,
					(tileIndex + 1) * BYTES_PER_TILE
				);

				if (typeof t === 'number') {
					return {
						romOffset,
						tileIndex: t,
						data,
					};
				} else {
					return {
						...t,
						data,
					};
				}
			});
		}
	);

	const dataUrl = tileToDataUrl(tileData, resource.palette ?? DEFAULT_PALETTE);

	resource.url = dataUrl;
}

function cleanup() {
	memoDecompress.cache.clear?.();
}

export { extractResource, cleanup };
