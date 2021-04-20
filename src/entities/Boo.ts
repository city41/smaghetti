import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

/**
 * this is Boo, but it doesn't show up correctly yet.
 * There is a graphic flag for sprites I haven't found yet.
 */
const Boo: Entity = {
	type: 'Boo',
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	romOffset: 0x167674,
	objectId: 0x2f,
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
		[164, 165],
		[180, 181],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},
};

export { Boo };
