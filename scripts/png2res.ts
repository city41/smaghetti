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
import { gba16ToRgb } from '../src/tiles/extractResourcesToStylesheet';
import isEqual from 'lodash/isEqual';
import { toHexString } from '../src/components/hex-tree/HexTreePage/util';

const TILE_SIZE = 8;
type RGBColor = [number, number, number];
type RGBPalette = Array<RGBColor>;
type GBAPalette = number[];

function gbaPaletteToRgb(gbaPalette: number[]): RGBPalette {
	return gbaPalette.map((p) => gba16ToRgb(p));
}

function areSameColorLossy(a: RGBColor, b: RGBColor): boolean {
	return a.every((c, i) => Math.abs(c - b[i]) <= 1);
}

function convertToIndexed(
	rgbTileData: Uint8ClampedArray,
	gbaPalette: GBAPalette
): number[] | null {
	const indexed: number[] = [];
	const rgbPalette = gbaPaletteToRgb(gbaPalette);

	for (let i = 0; i < rgbTileData.length; i += 4) {
		const color: RGBColor = Array.from(rgbTileData.slice(i, i + 3)) as RGBColor;
		const index = rgbPalette.findIndex((p) => areSameColorLossy(color, p));

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
				return {
					tileExtraction: { ...result, flip },
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

				if (paletteIndex !== undefined && paletteIndex > 0) {
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

function parsePalettes(allPallettes: number[]): GBAPalette[] {
	const palettes: GBAPalette[] = [];

	for (let i = 0; i < allPallettes.length; i += 32) {
		const paletteStr = allPallettes
			.slice(i, i + 32)
			.map(toHexString)
			.join('');
		const gbaPalette = parseMGBAPaletteString(paletteStr);
		palettes.push(gbaPalette);
	}

	return palettes;
}

function main() {
	const romPath = process.argv[2];
	const pngPath = process.argv[3];
	const palettePath = process.argv[4];

	if (!romPath || !pngPath || !palettePath) {
		console.error(
			'usage: node png2res <path-to-rom> <path-to-png> <palette-binary-path>'
		);
		process.exit(1);
	}

	const paletteBuffer = fs.readFileSync(
		path.resolve(process.cwd(), palettePath)
	);

	const palettes = parsePalettes(Array.from(paletteBuffer));

	const pngBuffer = fs.readFileSync(path.resolve(process.cwd(), pngPath));
	const img = new Image();
	img.src = pngBuffer;

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));
	const romData = new Uint8Array(romBuffer);

	const tilePages = extractCompressedTilesFromRom(romData);

	const resource = buildResource(img, palettes, tilePages);

	console.log('// generated by png2res');
	console.log(JSON.stringify(resource, null, 2));
}

main();
