import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

const OBJECT_ID = 0x41;

const CardSlotMachine: Entity = {
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
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
	tiles: [
		[
			{ romOffset: 0x189ac0, tileIndex: 139 },
			{ romOffset: 0x189ac0, tileIndex: 140 },
			{ romOffset: 0x189ac0, tileIndex: 140 },
			{ romOffset: 0x189ac0, tileIndex: 139, flip: 'h' },
		],
		[
			{ romOffset: 0x189ac0, tileIndex: 171 },
			{ romOffset: 0x134104, tileIndex: 266 },
			{ romOffset: 0x134104, tileIndex: 267 },
			{ romOffset: 0x189ac0, tileIndex: 171, flip: 'h' },
		],
		[
			{ romOffset: 0x189ac0, tileIndex: 171 },
			{ romOffset: 0x134104, tileIndex: 298 },
			{ romOffset: 0x134104, tileIndex: 299 },
			{ romOffset: 0x189ac0, tileIndex: 171, flip: 'h' },
		],
		[
			{ romOffset: 0x189ac0, tileIndex: 139, flip: 'v' },
			{ romOffset: 0x189ac0, tileIndex: 140, flip: 'v' },
			{ romOffset: 0x189ac0, tileIndex: 140, flip: 'v' },
			{ romOffset: 0x189ac0, tileIndex: 139, flip: 'hv' },
		],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, OBJECT_ID);
	},
};

export { CardSlotMachine };
