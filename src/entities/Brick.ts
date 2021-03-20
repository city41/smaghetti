import type { ObjectEntity } from './types';
import { getBankLength } from './util';

const OBJECT_ID = 0xf;

const Brick: ObjectEntity = {
	type: 'Brick',
	mode: 'Object',
	dimensions: 2,
	romOffset: 0x131fe0,
	palette: [
		0x7f96,
		0x7fff,
		0x0,
		0x209,
		0x228e,
		0x3732,
		0x47b7,
		0x1f4,
		0x29a,
		0x37f,
		0x15,
		0xd9d,
		0x2bf,
		0x3600,
		0x4aa5,
		0x5b29,
	],
	tiles: [
		[308, 310],
		[309, 311],
	],

	toBinary(x, y, w, h) {
		return [getBankLength(1, w), y, x, OBJECT_ID, h];
	},
};

export { Brick };
