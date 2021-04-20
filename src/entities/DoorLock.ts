import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

const DoorLock: Entity = {
	type: 'DoorLock',
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	romOffset: 0x18af80,
	objectId: 0xce,
	palette: [
		0x7f96,
		0x7fff,
		0x18c6,
		0x3192,
		0x1636,
		0x2a9c,
		0x1f4,
		0x29a,
		0x37f,
		0x42ff,
		0x4a52,
		0x6318,
		0x77bd,
		0x7ffb,
		0x7fd2,
		0x732c,
	],
	tiles: [
		[78, 112],
		[110, 112],
	],

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},
};

export { DoorLock };
