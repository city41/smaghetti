import type { Entity } from './types';
import { getBankParam1 } from './util';

const WoodWalkway: Entity = {
	editorType: 'tile',
	gameType: 'object',
	dimensions: 'x',
	objectId: 0x61,
	emptyBank: 1,
	param1: 'width',
	romOffset: 0x1cf558,
	palette: [
		0x7ffb,
		0x7fff,
		0x0,
		0x575d,
		0x169a,
		0x1237,
		0xdd3,
		0x36b8,
		0x2633,
		0x15b0,
		0x12c,
		0x12c,
		0x3ebf,
		0x2e3d,
		0x19d9,
		0x155,
	],
	tiles: [
		[
			{ romOffset: 0x1cf558, tileIndex: 9 },
			{ romOffset: 0x1cf558, tileIndex: 9, flip: 'h' },
		],
		[17, 18],
	],

	toBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId!];
	},
};

export { WoodWalkway };
