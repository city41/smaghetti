import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

/**
 * not compatible with any existing room types :(
 */
const GiantGoomba: Entity = {
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	objectId: 0x7c,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x101a,
			0x10bf,
			0x125f,
			0x25fd,
			0x369e,
			0x475f,
			0x139f,
			0x177,
			0x21c,
			0x29f,
			0x47bf,
			0x137f,
			0x25f,
		],
		romOffset: 0x16ea40,
		tiles: [
			[832, 833, 834, 835],
			[848, 849, 850, 851],
			[864, 865, 866, 867],
		],
	},

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},
};

export { GiantGoomba };
