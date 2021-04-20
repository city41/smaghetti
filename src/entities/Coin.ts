import type { Entity } from './types';
import { getBankParam1 } from './util';

const Coin: Entity = {
	type: 'Coin',
	editorType: 'tile',
	gameType: 'object',
	dimensions: 'xy',
	romOffset: 0x176be8,
	objectId: 0x16,
	emptyBank: 1,
	param1: 'width',
	param2: 'height',
	palette: [
		0x7f96,
		0x7fff,
		0x0,
		0x209,
		0x228e,
		0x3732,
		0x47b7,
		0x1f4,
		0x29a,
		0x37f,
		0x15,
		0xd9d,
		0x2bf,
		0x3600,
		0x4aa5,
		0x5b29,
	],
	tiles: [
		[220, 222],
		[221, 223],
	],

	toBinary(x, y, w, h) {
		return [getBankParam1(1, w), y, x, this.objectId!, h];
	},
};

export { Coin };
