import { OneWayDoorHorizontalFlipper } from './OneWayDoorHorizontalFlipper';
import {
	extractResourceTileData,
	tileToCanvas,
} from '../tiles/extractResourcesToStylesheet';
import { DerivedResource } from './types';

const OneWayDoorVerticalFlipper: DerivedResource = {
	extract(rom, canvasGenerator) {
		const extractedTileData = extractResourceTileData(
			rom,
			OneWayDoorHorizontalFlipper
		);
		const horizontalCanvas = tileToCanvas(
			extractedTileData,
			OneWayDoorHorizontalFlipper.palettes,
			canvasGenerator
		);

		const verticalCanvas = canvasGenerator(
			horizontalCanvas.height,
			horizontalCanvas.width
		);
		const context = verticalCanvas.getContext('2d')!;

		context.translate(verticalCanvas.width / 2, verticalCanvas.height / 2);
		context.rotate((90 * Math.PI) / 180);
		context.drawImage(
			horizontalCanvas,
			-horizontalCanvas.width / 2,
			-horizontalCanvas.height / 2
		);

		return verticalCanvas;
	},
};

export { OneWayDoorVerticalFlipper };
