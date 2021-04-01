import type { ObjectEntity } from './types';

const TriangularBlock: ObjectEntity = {
	type: 'TriangularBlock',
	mode: 'Object',
	settingsType: 'none',
	dimensions: 'x',
	defaultSettings: { rotation: 0 },
	romOffset: 0x20e4f0,
	palette: [
		0x23df,
		0x7fff,
		0x0,
		0x4e71,
		0x5ef5,
		0x6f79,
		0x7bdd,
		0x13,
		0x19,
		0x1f,
		0x112,
		0x5a1f,
		0x6ebf,
		0x7f9f,
		0x579f,
		0x6fff,
	],
	tiles: [
		[96, 97],
		[112, 113],
	],

	toBinary(x, y, w, h, settings) {
		return [0, y, x, 0x50];
	},
};

export { TriangularBlock };
