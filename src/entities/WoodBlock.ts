import type { ObjectEntity } from './types';

const payloadToObjectId = {
	FireFlower: 0x24,
	Leaf: 0x25,
	StarMan: 0x26,
};

const WoodBlock: ObjectEntity = {
	type: 'WoodBlock',
	mode: 'Object',
	settingsType: 'single',
	dimensions: 'none',
	defaultSettings: { payload: 'StarMan' },
	romOffset: 0x163768,
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
		const objectId =
			payloadToObjectId[settings.payload as keyof typeof payloadToObjectId];

		return [0, y, x, objectId];
	},
};

export { WoodBlock, payloadToObjectId };
