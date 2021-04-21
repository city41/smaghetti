import type { Entity } from './types';
import { getBankParam1 } from './util';

const TerracottaBrick: Entity = {
	editorType: 'tile',
	gameType: 'object',
	dimensions: 'xy',
	objectId: 0x5f,
	param1: 'width',
	param2: 'height',
	emptyBank: 1,

	resource: {
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
		romOffset: 0x1cf558,
		tiles: [
			[5, 6],
			[21, 22],
		],
	},

	toBinary(x, y, w, h): number[] {
		return [getBankParam1(1, w), y, x, this.objectId!, h];
	},
};

export { TerracottaBrick };
