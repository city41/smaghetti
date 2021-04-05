import type { Entity } from './types';

const OBJECT_ID = 0x15;

const Muncher: Entity = {
	type: 'Muncher',
	editorType: 'tile',
	gameType: 'object',
	dimensions: 'none',
	palette: [
		0x7f96,
		0x7fff,
		0x0,
		0x520c,
		0x6270,
		0x72f3,
		0x7b77,
		0x1f4,
		0x29a,
		0x37f,
		0x7e93,
		0x7f17,
		0x7fbc,
		0x7ffe,
		0x1df,
		0x31f,
	],
	tiles: [
		[
			{ romOffset: 0x176be8, tileIndex: 146 },
			{ romOffset: 0x176be8, tileIndex: 146, flip: 'h' },
		],
		[
			{ romOffset: 0x176be8, tileIndex: 147 },
			{ romOffset: 0x176be8, tileIndex: 147, flip: 'h' },
		],
	],

	toBinary(x, y) {
		return [0, y, x, OBJECT_ID];
	},
};

export { Muncher };
