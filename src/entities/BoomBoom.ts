import type { SpriteEntity } from './types';
import { simpleSpriteBinary } from './util';

/**
 * Boom Boom boss
 *
 * TODO: tiles, palette
 */
const OBJECT_ID = 0x4b;

const BoomBoom: SpriteEntity = {
	type: 'BoomBoom',
	mode: 'Sprite',
	palette: [
		0x7f96,
		0x0,
		0x7fff,
		0x196,
		0x123b,
		0x1a9e,
		0x25fd,
		0x369e,
		0x475f,
		0x0,
		0x7f11,
		0x7f74,
		0x7fd8,
		0x31f,
		0x21f,
		0x1d,
	],
	romOffset: 0x16ea40,
	tiles: [
		[
			{ romOffset: 0x16ea40, tileIndex: 250 },
			{ romOffset: 0x16ea40, tileIndex: 220 },
			{ romOffset: 0x16ea40, tileIndex: 220, flip: 'h' },
			{ romOffset: 0x16ea40, tileIndex: 250 },
		],
		[
			{ romOffset: 0x16ea40, tileIndex: 205 },
			{ romOffset: 0x16ea40, tileIndex: 206 },
			{ romOffset: 0x16ea40, tileIndex: 206, flip: 'h' },
			{ romOffset: 0x16ea40, tileIndex: 205, flip: 'h' },
		],
		[
			{ romOffset: 0x16ea40, tileIndex: 221 },
			{ romOffset: 0x16ea40, tileIndex: 222 },
			{ romOffset: 0x16ea40, tileIndex: 222, flip: 'h' },
			{ romOffset: 0x16ea40, tileIndex: 221, flip: 'h' },
		],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, OBJECT_ID);
	},
};

export { BoomBoom };
