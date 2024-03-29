import { gba16ToRgb } from '../../../tiles/extractResourcesToStylesheet';
import { ECoinPalette, ECoinPaletteData } from '../ECoinData';

type CanvasToCoinDataOptions = {
	// if specified, a transparent pixel gets converted to this color
	transparent: number;
};

const TILE_SIZE = 8;
const IMAGE_TILE_SIZE = 3;

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
	const labA = rgb2lab(rgbA);
	const labB = rgb2lab(rgbB);
	const deltaL = labA[0] - labB[0];
	const deltaA = labA[1] - labB[1];
	const deltaB = labA[2] - labB[2];
	const c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
	const c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
	const deltaC = c1 - c2;

	let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
	deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);

	const sc = 1.0 + 0.045 * c1;
	const sh = 1.0 + 0.015 * c1;
	const deltaLKlsl = deltaL / 1.0;
	const deltaCkcsc = deltaC / sc;
	const deltaHkhsh = deltaH / sh;
	const i =
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

function getTileData(
	rgbData: Uint8ClampedArray,
	options?: CanvasToCoinDataOptions
): number[] {
	const gbaData = [];

	for (let i = 0; i < rgbData.length; i += 4) {
		if (rgbData[i + 3] === 0) {
			if (options?.transparent) {
				gbaData.push(ECoinPalette.indexOf(options.transparent));
			} else {
				gbaData.push(0);
			}
		} else {
			const pixelColor = [rgbData[i], rgbData[i + 1], rgbData[i + 2]];
			const paletteIndex = findNearestColorIndex(pixelColor);

			gbaData.push(paletteIndex);
		}
	}

	return gbaData;
}

function canvasToCoinData(
	canvas: HTMLCanvasElement,
	options?: CanvasToCoinDataOptions
): number[] {
	const context = canvas.getContext('2d') as CanvasRenderingContext2D;

	let tileData: number[] = [];

	for (let y = 0; y < IMAGE_TILE_SIZE; ++y) {
		for (let x = 0; x < IMAGE_TILE_SIZE; ++x) {
			const tileImageData = context.getImageData(
				x * TILE_SIZE,
				y * TILE_SIZE,
				TILE_SIZE,
				TILE_SIZE
			);
			tileData = tileData.concat(getTileData(tileImageData.data, options));
		}
	}

	const packedTileData = [];
	for (let i = 0; i < tileData.length; i += 2) {
		packedTileData.push(((tileData[i + 1] & 0xf) << 4) | (tileData[i] & 0xf));
	}

	return packedTileData;
}

export { canvasToCoinData };
