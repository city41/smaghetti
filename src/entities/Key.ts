import type { SpriteEntity } from './types';
import { simpleSpriteBinary } from './util';

const OBJECT_ID = 0x1a;

const Key: SpriteEntity = {
	type: 'Key',
	mode: 'Sprite',
	romOffset: 0x18af80,
	palette: [
		0x7f96,
		0x7fff,
		0x18c6,
		0x3192,
		0x1636,
		0x2a9c,
		0x1f4,
		0x29a,
		0x37f,
		0x42ff,
		0x4a52,
		0x6318,
		0x77bd,
		0x7ffb,
		0x7fd2,
		0x732c,
	],
	tiles: [
		[76, 77],
		[108, 109],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, OBJECT_ID);
	},
};

export { Key };
