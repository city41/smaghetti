import { OneWayDoorHorizontalFlipper } from './OneWayDoorHorizontalFlipper';
import {
	extractResourceTileData,
	tileToCanvas,
} from '../tiles/extractResourcesToStylesheet';
import { DerivedResource } from './types';

const OneWayDoorVerticalFlipper: DerivedResource = {
	extract(rom: Uint8Array): string {
		const extractedTileData = extractResourceTileData(
			rom,
			OneWayDoorHorizontalFlipper
		);
		const horizontalCanvas = tileToCanvas(
			extractedTileData,
			OneWayDoorHorizontalFlipper.palette
		);

		const verticalCanvas = document.createElement(
			'canvas'
		) as HTMLCanvasElement;
		verticalCanvas.width = horizontalCanvas.height;
		verticalCanvas.height = horizontalCanvas.width;

		const context = verticalCanvas.getContext('2d')!;
		context.translate(verticalCanvas.width / 2, verticalCanvas.height / 2);
		context.rotate((90 * Math.PI) / 180);
		context.drawImage(
			horizontalCanvas,
			-horizontalCanvas.width / 2,
			-horizontalCanvas.height / 2
		);

		return verticalCanvas.toDataURL();
	},
};

export { OneWayDoorVerticalFlipper };
