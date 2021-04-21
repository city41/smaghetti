import type { Entity } from './types';
import { getBankParam1 } from './util';

const IndestructibleBrick: Entity = {
	editorType: 'tile',
	gameType: 'object',
	dimensions: 'y',
	param1: 'height',
	objectId: 0x80,
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
		romOffset: 0x20e4f0,
		tiles: [
			[78, 79],
			[94, 95],
		],
	},

	toBinary(x, y, _w, h) {
		return [getBankParam1(1, h), y, x, this.objectId!, 0];
	},
};

export { IndestructibleBrick };
