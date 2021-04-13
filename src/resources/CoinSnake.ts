import { Coin } from '../entities/Coin';
import {
	extractResourceTileData,
	tileToCanvas,
} from '../tiles/extractResourcesToStylesheet';
import { DerivedResource } from './types';

const CoinSnake: DerivedResource = {
	type: 'CoinSnake',

	extract(rom: Uint8Array): string {
		const extractedTileData = extractResourceTileData(rom, Coin);
		const coinCanvas = tileToCanvas(extractedTileData, Coin.palette);

		const coinSnakeCanvas = document.createElement(
			'canvas'
		) as HTMLCanvasElement;
		coinSnakeCanvas.width = 48;
		coinSnakeCanvas.height = 48;

		const context = coinSnakeCanvas.getContext('2d')!;

		context.drawImage(coinCanvas, 16, 0);
		context.drawImage(coinCanvas, 32, 0);
		context.drawImage(coinCanvas, 16, 16);
		context.drawImage(coinCanvas, 0, 32);
		context.drawImage(coinCanvas, 16, 32);

		return coinSnakeCanvas.toDataURL();
	},
};

export { CoinSnake };
