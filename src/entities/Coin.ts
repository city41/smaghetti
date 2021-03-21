import type { ObjectEntity } from './types';
import { getBankLength } from './util';

const OBJECT_ID = 0x16;

const Coin: ObjectEntity = {
	type: 'Coin',
	mode: 'Object',
	settingsType: 'none',
	defaultSettings: {},
	dimensions: 2,
	romOffset: 0x176be8,
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
		[220, 222],
		[221, 223],
	],

	toBinary(x, y, w, h) {
		return [getBankLength(1, w), y, x, OBJECT_ID, h];
	},
};

export { Coin };
