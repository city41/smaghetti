import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

/**
 * TODO: needs a detail pane to pick direction.
 * But possibly will combine all red piranna plant
 * sprites into a single entity
 */
const HorizontalRedPirannaPlant: Entity = {
	type: 'HorizontalRedPirannaPlant',
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	romOffset: 0x1724f0,
	objectId: 0xff,
	param1: 'other',
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
		[1000, 1001, { romOffset: 0x17a894, tileIndex: 642 }],
		[1016, 1017, { romOffset: 0x17a894, tileIndex: 658 }],
	],

	toBinary(x, y) {
		// fifth byte
		// 0 -- face right
		// 1 -- face left
		return [0, this.objectId!, x, y, 0];
	},
};

export { HorizontalRedPirannaPlant };
