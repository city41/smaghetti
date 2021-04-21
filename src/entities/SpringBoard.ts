import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

const OBJECT_ID = 0xbb;

const SpringBoard: Entity = {
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	romOffset: 0x18af80,
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
	tiles: [
		[
			{ romOffset: 0x18af80, tileIndex: 8 },
			{ romOffset: 0x18af80, tileIndex: 8, flip: 'h' },
		],
		[
			{ romOffset: 0x18af80, tileIndex: 40 },
			{ romOffset: 0x18af80, tileIndex: 40, flip: 'h' },
		],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, OBJECT_ID);
	},
};

export { SpringBoard };
