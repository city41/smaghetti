import type { Entity } from './types';
import { getBankParam1 } from './util';

const WoodBlock: Entity = {
	editorType: 'tile',
	gameType: 'object',
	settingsType: 'single',
	dimensions: 'xy',
	defaultSettings: {},
	romOffset: 0x163768,
	objectId: 0x12,
	emptyBank: 1,
	payloadBank: 0,
	param1: 'width',
	param2: 'height',
	payloadToObjectId: {
		FireFlower: 0x24,
		Leaf: 0x25,
		StarMan: 0x26,
	},
	palette: [
		0x7f96,
		0x7fff,
		0x0,
		0x17b,
		0x1a1f,
		0x329f,
		0x4b7f,
		0x2e24,
		0x46c9,
		0x634d,
		0x3192,
		0x1636,
		0x2a9c,
		0x42ff,
		0x0,
		0x0,
	],
	tiles: [
		[636, 638],
		[637, 639],
	],

	toBinary(x, y, w, h, settings) {
		const payloadToObjectId = this.payloadToObjectId!;

		if (settings.payload in payloadToObjectId) {
			// if there is a payload then need to split this up into individual brick objects

			let binaries: number[] = [];
			const objectId = payloadToObjectId[
				settings.payload as keyof typeof payloadToObjectId
			]!;

			for (let by = 0; by < h + 1; ++by) {
				for (let bx = 0; bx < w + 1; ++bx) {
					binaries = binaries.concat([0, y + by, x + bx, objectId]);
				}
			}

			return binaries;
		} else {
			return [getBankParam1(1, w), y, x, this.objectId!, h];
		}
	},
};

export { WoodBlock };
