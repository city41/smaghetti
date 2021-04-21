import type { Entity } from './types';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';

const BowserLaserStatue: Entity = {
	objectSets: [ROOM_TYPE_SETTINGS.fortress.objectSet],
	graphicSets: [ROOM_TYPE_SETTINGS.fortress.objectGraphicSet],
	type: 'BowserLaserStatue',
	editorType: 'entity',
	gameType: 'object',
	dimensions: 'none',
	romOffset: 0x167674,
	objectId: 0x5,
	emptyBank: 0,
	palette: [
		0x7f96,
		0x7fff,
		0x0,
		0x39ce,
		0x4a52,
		0x6318,
		0x77bd,
		0x732c,
		0x7fd2,
		0x7ffb,
		0xdf7,
		0x267c,
		0x435f,
		0x5bbf,
		0x0,
		0x0,
	],
	tiles: [
		[48, 50],
		[49, 51],
		[52, 54],
		[53, 55],
	],

	toBinary(x, y) {
		return [0, y, x, this.objectId!];
	},
};

export { BowserLaserStatue };
