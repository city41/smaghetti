import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

/**
 * this is an empty bubble, it can take payloads
 *
 * TODO: figure out how to give it payloads
 */
const OBJECT_ID = 0xdb;

const Bubble: Entity = {
	type: 'Bubble',
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
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
	romOffset: 0x18af80,
	tiles: [
		[134, 135, 136, 137],
		[166, 167, 168, 169],
		[198, 199, 200, 201],
		[230, 231, 232, 233],
	],

	toBinary(x, y) {
		// return simpleSpriteBinary(x, y, OBJECT_ID);
		return [0, OBJECT_ID, x, y, 2];
	},
};

export { Bubble };
