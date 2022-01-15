import { Coin } from '../entities/Coin';
import {
	extractResourceTileData,
	tileToCanvas,
} from '../tiles/extractResourcesToStylesheet';
import { DerivedResource, StaticResource } from './types';

const CoinSnake: DerivedResource = {
	extract(rom, canvasGenerator) {
		const coinResource = Coin.resource as StaticResource;

		const extractedTileData = extractResourceTileData(rom, coinResource);
		const coinCanvas = tileToCanvas(
			extractedTileData,
			coinResource.palettes,
			canvasGenerator
		);

		const coinSnakeCanvas = canvasGenerator(48, 48);
		const context = coinSnakeCanvas.getContext('2d')!;

		context.drawImage(coinCanvas, 16, 0);
		context.drawImage(coinCanvas, 32, 0);
		context.drawImage(coinCanvas, 16, 16);
		context.drawImage(coinCanvas, 0, 32);
		context.drawImage(coinCanvas, 16, 32);

		return coinSnakeCanvas;
	},
};

export { CoinSnake };
