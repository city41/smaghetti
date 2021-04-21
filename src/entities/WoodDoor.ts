import type { Entity } from './types';

const WoodDoor: Entity = {
	editorType: 'entity',
	gameType: 'object',
	dimensions: 'none',
	objectId: 0xf,
	emptyBank: 0,
	romOffset: 0x16ad5c,
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
		[496, 497],
		[498, 499],
		[484, 485],
		[500, 501],
	],

	toBinary(x, y) {
		return [0, y, x, this.objectId!];
	},
};

export { WoodDoor };
