import { Coin } from '../entities/Coin';
import {
	extractResourceTileData,
	tileToCanvas,
} from '../tiles/extractResourcesToStylesheet';
import { DerivedResource, StaticResource } from './types';

const CoinCache: DerivedResource = {
	extract(rom: Uint8Array): string {
		const coinResource = Coin.resource as StaticResource;

		const extractedTileData = extractResourceTileData(rom, coinResource);
		const coinCanvas = tileToCanvas(extractedTileData, coinResource.palette);

		const coinCacheCanvas = document.createElement(
			'canvas'
		) as HTMLCanvasElement;
		coinCacheCanvas.width = 16;
		coinCacheCanvas.height = 16;

		const context = coinCacheCanvas.getContext('2d')!;

		context.drawImage(coinCanvas, -4, 1);
		context.drawImage(coinCanvas, 0, -1);
		context.drawImage(coinCanvas, 4, 1);

		return coinCacheCanvas.toDataURL();
	},
};

export { CoinCache };
