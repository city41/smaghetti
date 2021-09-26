import 'ignore-styles';
import fs from 'fs';
import path from 'path';
import { createCanvas, Image } from 'canvas';
import { ECoinPaletteData } from '../src/entities/ECoin/ECoinData';
import { gba16ToRgb } from '../src/tiles/extractResourcesToStylesheet';

const TILE_SIZE = 8;
const IMAGE_TILE_SIZE = 3;
const IMAGE_SIZE = IMAGE_TILE_SIZE * TILE_SIZE;

// since converting between 16 bit and 24 bit is a bit lossy,
// using this color delta function to be safe
//
// copied from https://stackoverflow.com/a/52453462/194940
function rgb2lab(rgb: number[]) {
	let r = rgb[0] / 255,
		g = rgb[1] / 255,
		b = rgb[2] / 255,
		x,
		y,
		z;
	r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
	g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
	b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
	x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
	y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
	z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
	x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
	return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

function deltaE(rgbA: number[], rgbB: number[]) {
	let labA = rgb2lab(rgbA);
	let labB = rgb2lab(rgbB);
	let deltaL = labA[0] - labB[0];
	let deltaA = labA[1] - labB[1];
	let deltaB = labA[2] - labB[2];
	let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
	let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
	let deltaC = c1 - c2;
	let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
	deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
	let sc = 1.0 + 0.045 * c1;
	let sh = 1.0 + 0.015 * c1;
	let deltaLKlsl = deltaL / 1.0;
	let deltaCkcsc = deltaC / sc;
	let deltaHkhsh = deltaH / sh;
	let i =
		deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
	return i < 0 ? 0 : Math.sqrt(i);
}

function findNearestColorIndex(rgbColor: number[]): number {
	let currentBestIndex = 0;
	let currentBestDelta = Number.MAX_SAFE_INTEGER;

	for (let i = 0; i < ECoinPaletteData.length; i += 2) {
		const sixteenBitColor =
			(ECoinPaletteData[i + 1] << 8) | ECoinPaletteData[i];
		const curRgbColor = gba16ToRgb(sixteenBitColor);

		const delta = deltaE(curRgbColor, rgbColor);

		if (delta < currentBestDelta) {
			currentBestDelta = delta;
			currentBestIndex = i;
		}
	}

	return currentBestIndex / 2;
}

function getTileData(rgbData: Uint8ClampedArray): number[] {
	const gbaData = [];

	for (let i = 0; i < rgbData.length; i += 4) {
		if (rgbData[i + 3] === 0) {
			gbaData.push(0);
		} else {
			const pixelColor = [rgbData[i], rgbData[i + 1], rgbData[i + 2]];
			const paletteIndex = findNearestColorIndex(pixelColor);

			gbaData.push(paletteIndex);
		}
	}

	return gbaData;
}

function main() {
	const pngFile = process.argv[2];

	if (!pngFile) {
		console.error('usage: node pngToECoinData <path-to-png>');
		process.exit(1);
	}

	const imagePath = path.resolve(process.cwd(), pngFile);
	const imageBuffer = fs.readFileSync(imagePath);
	const img = new Image();
	img.src = imageBuffer;

	const canvas = createCanvas(IMAGE_SIZE, IMAGE_SIZE);
	const context = canvas.getContext('2d') as CanvasRenderingContext2D;

	// @ts-ignore
	context.drawImage(img, 0, 0, IMAGE_SIZE, IMAGE_SIZE);

	let tileData: number[] = [];

	for (let y = 0; y < IMAGE_TILE_SIZE; ++y) {
		for (let x = 0; x < IMAGE_TILE_SIZE; ++x) {
			const tileImageData = context.getImageData(
				x * TILE_SIZE,
				y * TILE_SIZE,
				TILE_SIZE,
				TILE_SIZE
			);
			tileData = tileData.concat(getTileData(tileImageData.data));
		}
	}

	const packedTileData = [];
	for (let i = 0; i < tileData.length; i += 2) {
		packedTileData.push(((tileData[i + 1] & 0xf) << 4) | (tileData[i] & 0xf));
	}

	console.log('[');
	console.log(
		ECoinPaletteData.map((b) => `0x${b.toString(16)}`).join(',\n'),
		','
	);
	console.log(packedTileData.map((b) => `0x${b.toString(16)}`).join(',\n'));
	console.log(']');
}

main();
