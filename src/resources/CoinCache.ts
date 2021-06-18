import { Coin } from '../entities/Coin';
import {
	extractResourceTileData,
	tileToCanvas,
} from '../tiles/extractResourcesToStylesheet';
import { DerivedResource, StaticResource } from './types';

const CoinCache: DerivedResource = {
	extract(rom, canvasGenerator): string {
		const coinResource = Coin.resource as StaticResource;

		const extractedTileData = extractResourceTileData(rom, coinResource);
		const coinCanvas = tileToCanvas(
			extractedTileData,
			coinResource.palettes,
			canvasGenerator
		);

		const coinCacheCanvas = canvasGenerator(16, 16);
		const context = coinCacheCanvas.getContext('2d')!;

		context.drawImage(coinCanvas, -4, 1);
		context.drawImage(coinCanvas, 0, -1);
		context.drawImage(coinCanvas, 4, 1);

		return coinCacheCanvas.toDataURL();
	},
};

export { CoinCache };
