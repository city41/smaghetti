import type { Entity } from './types';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';

const FireBar: Entity = {
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	objectId: 0xb9,
	romOffset: 0x163768,
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
		[290, 290],
		[306, 306],
	],

	toBinary(x, y): number[] {
		// todo: 3 means 4 fireballs counterclockwise, need a details pan to let user choose
		return [0, this.objectId!, x, y, 3];
	},
};

export { FireBar };
