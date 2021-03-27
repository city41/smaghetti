import type { SpriteEntity } from './types';
import { simpleSpriteBinary } from './util';

/**
 * this is a coin snake just hanging out in the level, not inside a block
 *  todo: tiles and palette, figure out how to make it a payload
 */

const OBJECT_ID = 0xdc;

const CoinSnake: SpriteEntity = {
	type: 'CoinSnake',
	mode: 'Sprite',
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
	romOffset: 0x134104,
	tiles: [
		[268, 269],
		[300, 301],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, OBJECT_ID);
	},
};

export { CoinSnake };
