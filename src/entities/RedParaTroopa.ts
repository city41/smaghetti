import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

const OBJECT_ID = 0x6f;

const RedParaTroopa: Entity = {
	type: 'RedParaTroopa',
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
	tiles: [
		[
			{ romOffset: 0x2282e4, tileIndex: 322 },
			{ romOffset: 0x1724f0, tileIndex: 967 },
		],
		[
			{ romOffset: 0x2282e4, tileIndex: 354 },
			{ romOffset: 0x1724f0, tileIndex: 983 },
		],
		[
			{ romOffset: 0x2282e4, tileIndex: 386 },
			{ romOffset: 0x2282e4, tileIndex: 387 },
		],
		[
			{ romOffset: 0x2282e4, tileIndex: 418 },
			{ romOffset: 0x2282e4, tileIndex: 419 },
		],
	],
	toBinary(x, y) {
		return simpleSpriteBinary(x, y, OBJECT_ID);
	},
};

export { RedParaTroopa };
