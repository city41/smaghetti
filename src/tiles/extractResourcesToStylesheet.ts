import memoize from 'lodash/memoize';
import { decompress } from './extractCompressedTilesFromRom';
import { Resource } from '../resources/types';
import { StaticResource, TileExtractionSpec } from '../resources/types';
import { EntityType } from '../entities/entityMap';
import { ResourceType } from '../resources/resourceMap';
import { isStaticResource } from '../resources/util';

type TileExtractionSpecWithData = TileExtractionSpec & { data: number[] };
type ExtractedEntityTileData = Array<Array<TileExtractionSpecWithData>>;

const memoDecompress = memoize(decompress, (_rom, offset) => offset);

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
	const p = [];
	for (let i = 0; i < 16; ++i) {
		const red = Math.floor((i / 15) * 255);
		const green = Math.floor((i / 15) * 255);
		const blue = Math.floor((i / 15) * 255);

		p[i] = rgbToGBA16(red, green, blue);
	}

	return p;
})();

function drawTile(
	tileData: number[],
	palette: Tuple<number, 16> = DEFAULT_PALETTE,
	options: { firstColorOpaque: boolean } = { firstColorOpaque: false }
): HTMLCanvasElement {
	const canvas = document.createElement('canvas');
	canvas.width = 8;
	canvas.height = 8;
	const context = canvas.getContext('2d')!;

	const imageData = context.getImageData(0, 0, 8, 8);

	for (let p = 0; p < tileData.length; ++p) {
		const lowerPixel = (tileData[p] >> 4) & 0xf;
		const upperPixel = tileData[p] & 0xf;

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
): void {
	canvas.height = tileData.length * 8;
	canvas.width = tileData[0].length * 8;
	const context = canvas.getContext('2d')!;

	for (let y = 0; y < tileData.length; ++y) {
		for (let x = 0; x < tileData[y].length; ++x) {
			const spec = tileData[y][x];

			let tileCanvas = drawTile(spec.data, palette, options);
			tileCanvas = flip(tileCanvas, spec.flip);

			context.drawImage(tileCanvas, x * 8, y * 8, 8, 8);
		}
	}
}

function tileToCanvas(
	tileData: Array<Array<TileExtractionSpecWithData>>,
	palette: number[],
	firstColorOpaque?: boolean
): HTMLCanvasElement {
	const canvas = document.createElement('canvas');
	renderTiles(canvas, tileData, palette, {
		firstColorOpaque: !!firstColorOpaque,
	});

	return canvas;
}

function extractResourceTileData(
	rom: Uint8Array,
	resource: StaticResource
): ExtractedEntityTileData {
	const tileData: Array<Array<TileExtractionSpecWithData>> = resource.tiles.map(
		(tileIndexRow) => {
			return tileIndexRow.map((t) => {
				const tileIndex = typeof t === 'number' ? t : t.tileIndex;
				const romOffset =
					typeof t === 'number' ? resource.romOffset : t.romOffset;

				if (typeof romOffset !== 'number') {
					throw new Error('extractResourceToDataUrl: romOffset not specified');
				}

				let data;

				if (typeof t === 'number' || !t.uncompressed) {
					const offsetData = memoDecompress(rom, romOffset);

					if (!offsetData) {
						throw new Error(
							`extractResource: romOffset does not yield tile data: ${romOffset}`
						);
					}

					data = offsetData.slice(
						tileIndex * BYTES_PER_TILE,
						(tileIndex + 1) * BYTES_PER_TILE
					);
				} else {
					const offsetData = rom.subarray(romOffset + (t.shift ?? 0));
					data = Array.from(
						offsetData.slice(
							tileIndex * BYTES_PER_TILE,
							(tileIndex + 1) * BYTES_PER_TILE
						)
					);
				}

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

function extractResourceToDataUrl(
	rom: Uint8Array,
	resource: StaticResource
): string {
	const tileData = extractResourceTileData(rom, resource);
	const canvas = tileToCanvas(
		tileData,
		resource.palette ?? DEFAULT_PALETTE,
		resource.firstColorOpaque
	);

	return canvas.toDataURL();
}

async function extractResourcesToStylesheet(
	rom: Uint8Array,
	resources: Partial<Record<EntityType | ResourceType, Resource>>
): Promise<void> {
	let css = '';

	const keys = Object.keys(resources) as Array<EntityType | ResourceType>;

	for (let i = 0; i < keys.length; ++i) {
		const resourceName = keys[i];
		const resource = resources[resourceName];

		if (!resource) {
			throw new Error(
				`extractResourcesToStylesheet: failed to get a resource from the passed in record: ${resourceName}`
			);
		}

		let dataUrl;
		if (isStaticResource(resource)) {
			dataUrl = await extractResourceToDataUrl(rom, resource);
		} else {
			dataUrl = resource.extract(rom);
		}

		css = `${css}\n.${resourceName}-bg { background-image: url(${dataUrl}); }`;
	}

	const textNode = document.createTextNode(css);
	const style = document.createElement('style');
	style.append(textNode);

	document.head.appendChild(style);

	memoDecompress.cache.clear?.();
}

export {
	extractResourcesToStylesheet,
	rgbToGBA16,
	drawTile,
	renderTiles,
	extractResourceTileData,
	tileToCanvas,
};
export type { ExtractedEntityTileData };
