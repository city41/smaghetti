import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

/**
 * Bobomb
 */
const OBJECT_ID = 0x55;

const Bobomb: Entity = {
	type: 'Bobomb',
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	palette: [
		0x7f96,
		0x7fff,
		0x18c6,
		0x26b,
		0x1b10,
		0x13b4,
		0x25fd,
		0x369e,
		0x475f,
		0x1abf,
		0x1c,
		0x253f,
		0x463f,
		0x7ad1,
		0x6e2c,
		0x59a6,
	],
	romOffset: 0x163768,
	tiles: [
		[744, 745],
		[762, 763],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, OBJECT_ID);
	},
};

export { Bobomb };
