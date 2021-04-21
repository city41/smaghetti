import type { Entity } from './types';

const OBJECT_ID = 0xfa;

const AceCoin: Entity = {
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
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
		[10, 11],
		[42, 43],
		[74, 75],
		[106, 107],
	],

	toBinary(x, y, w, h, settings) {
		// if (typeof settings.aceCoinIndex !== 'number') {
		// 	throw new Error('AceCoin#toBinary: no aceCoinIndex setting found');
		// }

		return [0, OBJECT_ID, x, y, settings.aceCoinIndex];
	},
};

export { AceCoin };
