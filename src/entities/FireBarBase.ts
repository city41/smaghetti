import type { Entity } from './types';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';

const FireBarBase: Entity = {
	objectSets: [ROOM_TYPE_SETTINGS.fortress.objectSet],
	graphicSets: [ROOM_TYPE_SETTINGS.fortress.objectGraphicSet],
	editorType: 'tile',
	gameType: 'object',
	dimensions: 'none',
	objectId: 0x2,
	emptyBank: 0,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0xda,
			0x159e,
			0x2a3f,
			0x3eff,
			0x1f4,
			0x29a,
			0x37f,
			0xb1,
			0x155,
			0x19d9,
			0x2e3d,
			0x3ebf,
			0x13,
		],
		romOffset: 0x167674,
		tiles: [
			[108, 110],
			[109, 111],
		],
	},

	toBinary(x, y): number[] {
		return [0, y, x, this.objectId!];
	},
};

export { FireBarBase };
