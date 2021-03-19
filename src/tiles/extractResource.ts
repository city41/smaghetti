import memoize from 'lodash/memoize';
import { ExtractedResource, TileExtractionSpec } from '../resources';
import { decompress } from './extractCompressedTilesFromRom';

type TileExtractionSpecWithData = TileExtractionSpec & { data: number[] };
type ExtractedEntityTileData = Array<Array<TileExtractionSpecWithData>>;

const memoDecompress = memoize(decompress, (rom, offset) => offset);

const BYTES_PER_TILE = 32;

function rgbToGBA16(r: number, g: number, b: number): number {
	const gbaR = Math.floor((31 * r) / 255);
	const gbaG = Math.floor((31 * g) / 255);
	const gbaB = Math.floor((31 * b) / 255);

	return (gbaB << 10) | (gbaG << 5) | gbaR;
}

function gba16ToRgb(gba16: number): [number, number, number] {
	const red5 = gba16 & 0x1f;
	const green5 = (gba16 >> 5) & 0x1f;
	const blue5 = (gba16 >> 10) & 0x1f;

	const red8 = Math.floor((red5 / 31) * 255);
	const green8 = Math.floor((green5 / 31) * 255);
	const blue8 = Math.floor((blue5 / 31) * 255);

	return [red8, green8, blue8];
}

const DEFAULT_PALETTE: number[] = (function () {
	let p = [];
	for (let i = 0; i < 16; ++i) {
		const red = Math.floor((i / 15) * 255);
		const green = Math.floor((i / 15) * 255);
		const blue = Math.floor((i / 15) * 255);

		p[i] = rgbToGBA16(red, green, blue);
	}

	return p;
})();

function drawTile(
	tile: TileExtractionSpecWithData,
	palette: Tuple<number, 16>,
	options: { firstColorOpaque: boolean } = { firstColorOpaque: false }
): HTMLCanvasElement {
	const canvas = document.createElement('canvas');
	canvas.width = 8;
	canvas.height = 8;
	const context = canvas.getContext('2d')!;

	const imageData = context.getImageData(0, 0, 8, 8);

	for (let p = 0; p < tile.data.length; ++p) {
		const lowerPixel = (tile.data[p] >> 4) & 0xf;
		const upperPixel = tile.data[p] & 0xf;

		const upperColor = gba16ToRgb(palette[upperPixel]);
		const lowerColor = gba16ToRgb(palette[lowerPixel]);

		imageData.data[p * 8 + 0] = upperColor[0];
		imageData.data[p * 8 + 1] = upperColor[1];
		imageData.data[p * 8 + 2] = upperColor[2];
		imageData.data[p * 8 + 3] =
			upperPixel === 0 && !options.firstColorOpaque ? 0 : 255;

		imageData.data[p * 8 + 4] = lowerColor[0];
		imageData.data[p * 8 + 5] = lowerColor[1];
		imageData.data[p * 8 + 6] = lowerColor[2];
		imageData.data[p * 8 + 7] =
			lowerPixel === 0 && !options.firstColorOpaque ? 0 : 255;
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

function renderTiles(
	canvas: HTMLCanvasElement,
	tileData: ExtractedEntityTileData,
	palette: number[],
	options?: { firstColorOpaque: boolean }
) {
	canvas.height = tileData.length * 8;
	canvas.width = tileData[0].length * 8;
	const context = canvas.getContext('2d')!;

	for (let y = 0; y < tileData.length; ++y) {
		for (let x = 0; x < tileData[y].length; ++x) {
			const spec = tileData[y][x];

			let tileCanvas = drawTile(spec, palette, options);
			tileCanvas = flip(tileCanvas, spec.flip);

			context.drawImage(tileCanvas, x * 8, y * 8, 8, 8);
		}
	}
}

function tileToDataUrl(
	tileData: Array<Array<TileExtractionSpecWithData>>,
	palette: number[]
): string {
	const canvas = document.createElement('canvas');
	renderTiles(canvas, tileData, palette);

	return canvas.toDataURL();
}

function extractResourceTileData(
	rom: Uint8Array,
	resource: ExtractedResource
): ExtractedEntityTileData {
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

	return tileData;
}

function extractResource(rom: Uint8Array, resource: ExtractedResource) {
	const tileData = extractResourceTileData(rom, resource);
	const dataUrl = tileToDataUrl(tileData, resource.palette ?? DEFAULT_PALETTE);
	resource.url = dataUrl;
}

function cleanup() {
	memoDecompress.cache.clear?.();
}

export { extractResource, renderTiles, extractResourceTileData, cleanup };
export type { ExtractedEntityTileData };
