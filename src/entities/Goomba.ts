import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

const Goomba: Entity = {
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	romOffset: 0x134104,
	objectId: 0x72,
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
		[394, 395],
		[426, 427],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},
};

export { Goomba };
