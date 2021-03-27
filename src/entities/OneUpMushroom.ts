import type { SpriteEntity } from './types';
import { simpleSpriteBinary } from './util';

/**
 * this entity was made so it can become a payload inside a brick
 * TODO: make it standalone, figure out id, tile and palette
 */
const OBJECT_ID = 0x6e;

const OneUpMushroom: SpriteEntity = {
	type: 'OneUpMushroom',
	mode: 'Sprite',
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
	romOffset: 0x134104,
	tiles: [
		[266, 267],
		[298, 299],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, OBJECT_ID);
	},
};

export { OneUpMushroom };
