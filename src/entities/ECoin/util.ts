import {
	documentCanvasGenerator,
	extractResourceTileData,
	tileToCanvas,
} from '../../tiles/extractResourcesToStylesheet';
import { ECoinPalette } from './ECoinData';

const COIN_SIZE = 24;

const ECOIN_TILES = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
].map((row) => {
	return row.map((c) => ({ tileIndex: c, uncompressed: true }));
});

function setCoinData(canvas: HTMLCanvasElement, coinData: number[]) {
	const data = new Uint8Array(coinData);

	const extractedPixelData = extractResourceTileData(data, {
		palettes: [],
		romOffset: 0,
		tiles: ECOIN_TILES,
	});

	const dataInCanvas = tileToCanvas(
		extractedPixelData,
		[ECoinPalette],
		documentCanvasGenerator,
		false
	);

	canvas.getContext('2d')!.drawImage(dataInCanvas, 0, 0, COIN_SIZE, COIN_SIZE);
}

export { COIN_SIZE, setCoinData };
