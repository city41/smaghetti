import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

const OBJECT_ID = 0xa;

const ThreeUpMoon: Entity = {
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',

	resource: {
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
		romOffset: 0x18af80,
		tiles: [
			[68, 69],
			[100, 101],
		],
	},

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, OBJECT_ID);
	},
};

export { ThreeUpMoon };
