import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

const Thwimp: Entity = {
	type: 'Thwimp',
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	romOffset: 0x18c914,
	objectId: 0xd0,
	palette: [
		0x7fff,
		0x7fff,
		0x0,
		0x5ad6,
		0x739c,
		0x7fff,
		0x26ff,
		0x37f,
		0x5bff,
		0x37f,
		0x4d7f,
		0x0,
		0x0,
		0x0,
		0x0,
		0x0,
	],

	tiles: [
		[413, { romOffset: 0x18c914, tileIndex: 413, flip: 'h' }],
		[445, { romOffset: 0x18c914, tileIndex: 445, flip: 'h' }],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},
};

export { Thwimp };
