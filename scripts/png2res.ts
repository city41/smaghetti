import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';
import { CanvasRenderingContext2D, createCanvas, Image } from 'canvas';
import { parseMGBAPaletteString } from './lib/parseMGBAPaletteString';
import { StaticResource, TileExtractionSpec } from '../src/resources/types';
import {
	extractCompressedTilesFromRom,
	TilePage,
} from '../src/tiles/extractCompressedTilesFromRom';
import {
	gba16ToRgb,
	rgbToGBA16,
} from '../src/tiles/extractResourcesToStylesheet';
import countBy from 'lodash/countBy';
import isEqual from 'lodash/isEqual';
import without from 'lodash/without';
import { toHexString } from '../src/components/hex-tree/HexTreePage/util';

const TILE_SIZE = 8;
type RGBColor = [number, number, number];
type RGBPalette = Array<RGBColor>;
type GBAPalette = number[];

function gbaPaletteToRgb(gbaPalette: number[]): RGBPalette {
	return gbaPalette.map((p) => gba16ToRgb(p));
}

function colorDistance([r1, g1, b1]: RGBColor, [r2, g2, b2]: RGBColor): number {
	return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
}

function findBestMatch(color: RGBColor, palette: RGBColor[]): RGBColor | null {
	let bestSoFar = palette[0];
	let bestDistanceSoFar = colorDistance(color, palette[0]);

	for (let i = 0; i < palette.length; ++i) {
		const distance = colorDistance(color, palette[i]);

		if (distance < bestDistanceSoFar) {
			bestDistanceSoFar = distance;
			bestSoFar = palette[i];
		}
	}

	if (bestDistanceSoFar > 2) {
		return null;
	}

	return bestSoFar;
}

function convertToIndexed(
	rgbTileData: Uint8ClampedArray,
	gbaPalette: GBAPalette
): number[] | null {
	const indexed: number[] = [];
	const rgbPalette = gbaPaletteToRgb(gbaPalette);

	for (let i = 0; i < rgbTileData.length; i += 4) {
		const color: RGBColor = Array.from(rgbTileData.slice(i, i + 3)) as RGBColor;
		const bestMatchColor = findBestMatch(color, rgbPalette);

		if (bestMatchColor === null) {
			return null;
		}

		const index = rgbPalette.indexOf(bestMatchColor);

		if (index < 0) {
			return null;
		}

		indexed.push(index);
	}

	return indexed;
}

function findTile(
	indexedTileData: number[],
	tilePages: TilePage[]
): { romOffset: number; tileIndex: number } | null {
	const page = tilePages.find((p) => {
		return p.tiles.some((t) => isEqual(t, indexedTileData));
	});

	if (page) {
		return {
			romOffset: page.address,
			tileIndex: page.tiles.findIndex((t) => isEqual(t, indexedTileData)),
		};
	} else {
		return null;
	}
}

function squishIntoNibbles(input: number[]): number[] {
	const output: number[] = [];

	for (let i = 0; i < input.length; i += 2) {
		const first = input[i + 1];
		const second = input[i];

		const squished = (first << 4) | second;
		output.push(squished);
	}

	return output;
}

function getTile(
	x: number,
	y: number,
	context: CanvasRenderingContext2D,
	palettes: GBAPalette[],
	tilePages: TilePage[],
	flip: TileExtractionSpec['flip']
): { tileExtraction: TileExtractionSpec; matchingPalette: GBAPalette } | null {
	const flipCanvas = createCanvas(TILE_SIZE, TILE_SIZE);
	const flipContext = flipCanvas.getContext('2d')!;

	switch (flip) {
		case 'h':
			flipContext.translate(TILE_SIZE, 0);
			flipContext.scale(-1, 1);
			break;
		case 'v':
			flipContext.translate(0, TILE_SIZE);
			flipContext.scale(1, -1);
			break;
		case 'hv':
			flipContext.translate(TILE_SIZE, TILE_SIZE);
			flipContext.scale(-1, -1);
			break;
	}

	flipContext.drawImage(
		context.canvas,
		x,
		y,
		TILE_SIZE,
		TILE_SIZE,
		0,
		0,
		TILE_SIZE,
		TILE_SIZE
	);

	const imageData = flipContext.getImageData(0, 0, TILE_SIZE, TILE_SIZE);

	for (let p = 0; p < palettes.length; ++p) {
		const curPalette = palettes[p];
		const indexedTileData = convertToIndexed(imageData.data, curPalette);

		if (indexedTileData) {
			const gbaTileData = squishIntoNibbles(indexedTileData);

			const result = findTile(gbaTileData, tilePages);

			if (result) {
				const tileExtraction =
					flip !== undefined ? { ...result, flip } : result;
				return {
					tileExtraction,
					matchingPalette: curPalette,
				};
			}
		}
	}

	return null;
}

function buildResource(
	img: Image,
	palettes: GBAPalette[],
	tilePages: TilePage[]
): StaticResource {
	const canvas = createCanvas(img.width, img.height);
	const context = canvas.getContext('2d')!;
	context.drawImage(img, 0, 0, img.width, img.height);

	const paletteMap: Map<GBAPalette, number> = new Map();
	const tiles: Array<Array<number | TileExtractionSpec | null>> = [];

	for (let y = 0; y < canvas.height; y += TILE_SIZE) {
		const row: Array<number | TileExtractionSpec | null> = [];
		for (let x = 0; x < canvas.width; x += TILE_SIZE) {
			const result =
				getTile(x, y, context, palettes, tilePages, undefined) ??
				getTile(x, y, context, palettes, tilePages, 'h') ??
				getTile(x, y, context, palettes, tilePages, 'v') ??
				getTile(x, y, context, palettes, tilePages, 'hv');

			if (result) {
				if (!paletteMap.has(result.matchingPalette)) {
					paletteMap.set(result.matchingPalette, paletteMap.size);
				}

				const paletteIndex = paletteMap.get(result.matchingPalette);

				if (paletteIndex !== undefined) {
					row.push({ ...result.tileExtraction, palette: paletteIndex });
				} else {
					row.push(result.tileExtraction);
				}
			} else {
				row.push(result);
			}
		}

		tiles.push(row);
	}

	const finalPalettes = Array.from(paletteMap.keys());

	return {
		palettes: finalPalettes,
		tiles,
	};
}

function getMostCommonInTiles(
	tiles: StaticResource['tiles'],
	prop: keyof TileExtractionSpec
): number {
	const flatTiles = without(tiles.flat(Infinity), null);
	const counts = countBy(flatTiles, prop);
	const mostCommonEntry = Object.entries(counts).reduce<[string, number]>(
		(bestSoFar, candidate) => {
			if (candidate[1] > bestSoFar[1]) {
				return candidate;
			} else {
				return bestSoFar;
			}
		},
		['dummy', -1]
	);

	return Number(mostCommonEntry[0]);
}

/**
 * buildResource builds a technically correct resource but it is not optimized.
 * Every single tile specifies its rom offset. But the most common rom offset
 * can be extracted to the top. That is what this method does.
 */
function extractMostCommonRomOffset(resource: StaticResource): StaticResource {
	const mostCommonOffset = getMostCommonInTiles(resource.tiles, 'romOffset');

	return {
		...resource,
		romOffset: mostCommonOffset,
		tiles: resource.tiles.map((row) =>
			row.map((cell) => {
				if (cell === null) {
					return cell;
				}

				if (typeof cell === 'number') {
					return cell;
				}

				if (cell.romOffset === mostCommonOffset) {
					if (Object.keys(cell).length === 2) {
						return cell.tileIndex;
					} else {
						const { romOffset, ...rest } = cell;
						return rest;
					}
				} else {
					return cell;
				}
			})
		),
	};
}

function moveToTop<T>(arrays: T[], index: number): T[] {
	const target = arrays[index];
	const rest = arrays.filter((a) => a !== target);

	return [target, ...rest];
}

/**
 * finds the most common and moves it to the top, then updates
 * all the tiles accordingly
 */
function optimizePaletteOrdering(resource: StaticResource): StaticResource {
	const mostCommonPaletteIndex = getMostCommonInTiles(
		resource.tiles,
		'palette'
	);

	return {
		...resource,
		palettes: moveToTop(resource.palettes, mostCommonPaletteIndex),
		tiles: resource.tiles.map((row) =>
			row.map((cell) => {
				if (cell === null) {
					return cell;
				}

				if (typeof cell === 'number') {
					return cell;
				}

				if (cell.palette === mostCommonPaletteIndex) {
					if (Object.keys(cell).length === 2) {
						return cell.tileIndex;
					} else {
						const { palette, ...rest } = cell;
						return rest;
					}
				} else if (
					cell.palette !== undefined &&
					cell.palette < mostCommonPaletteIndex
				) {
					return {
						...cell,
						palette: cell.palette + 1,
					};
				} else {
					return cell;
				}
			})
		),
	};
}

function parsePalettes(
	allPallettes: number[],
	zeroColor?: number
): GBAPalette[] {
	const palettes: GBAPalette[] = [];

	for (let i = 0; i < allPallettes.length; i += 32) {
		const paletteStr = allPallettes
			.slice(i, i + 32)
			.map(toHexString)
			.join('');
		const gbaPalette = parseMGBAPaletteString(paletteStr);

		if (typeof zeroColor === 'number') {
			gbaPalette[0] = zeroColor;
		}

		palettes.push(gbaPalette);
	}

	return palettes;
}

function getZeroColor(zeroColorStr: string | undefined): number | undefined {
	if (!zeroColorStr) {
		return undefined;
	}

	const channels = zeroColorStr.split(',');
	return rgbToGBA16(
		Number(channels[0]),
		Number(channels[1]),
		Number(channels[2])
	);
}

function main() {
	const romPath = process.argv[2];
	const pngPath = process.argv[3];
	const palettePath = process.argv[4];
	const zeroColorStr = process.argv[5];

	if (!romPath || !pngPath || !palettePath) {
		console.error(
			'usage: node png2res <path-to-rom> <path-to-png> <palette-binary-path> [<zero-color-str>]'
		);
		process.exit(1);
	}

	const paletteBuffer = fs.readFileSync(
		path.resolve(process.cwd(), palettePath)
	);

	const zeroColor = getZeroColor(zeroColorStr);

	const palettes = parsePalettes(Array.from(paletteBuffer), zeroColor);

	const pngBuffer = fs.readFileSync(path.resolve(process.cwd(), pngPath));
	const img = new Image();
	img.src = pngBuffer;

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));
	const romData = new Uint8Array(romBuffer);

	const tilePages = extractCompressedTilesFromRom(romData);

	const resource = buildResource(img, palettes, tilePages);
	const optimizedResource = optimizePaletteOrdering(
		extractMostCommonRomOffset(resource)
	);

	console.log('// generated by png2res');
	console.log(JSON.stringify(optimizedResource, null, 2));
}

main();
