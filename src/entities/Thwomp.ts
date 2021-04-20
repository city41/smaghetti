import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

const Thwomp: Entity = {
	type: 'Thwomp',
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	romOffset: 0x167674,
	objectId: 0x8a,
	palette: [
		0x7f96,
		0x7fff,
		0x18c6,
		0x39ce,
		0x4a52,
		0x5ef7,
		0x7a8b,
		0x7f6e,
		0x7fd6,
		0x6f7b,
		0x19f8,
		0x2e5c,
		0x42ff,
		0x1b1f,
		0x1a1f,
		0x1d,
	],

	tiles: [
		[170, 171, { romOffset: 0x167674, tileIndex: 170, flip: 'h' }],
		[186, 187, { romOffset: 0x167674, tileIndex: 186, flip: 'h' }],
		[174, 175, { romOffset: 0x167674, tileIndex: 174, flip: 'h' }],
		[190, 191, { romOffset: 0x167674, tileIndex: 190, flip: 'h' }],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},
};

export { Thwomp };
