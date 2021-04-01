import type { ObjectEntity } from './types';

const angleToObjectId: Record<number, number> = {
	0: 0x50,
	90: 0x51,
	180: 0x53,
	270: 0x52,
};

const TriangularBlock: ObjectEntity = {
	type: 'TriangularBlock',
	mode: 'Object',
	settingsType: 'single',
	dimensions: 'none',
	defaultSettings: { angle: 0 },
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
		return [0, y, x, angleToObjectId[settings.angle as number]];
	},
};

export { TriangularBlock };
