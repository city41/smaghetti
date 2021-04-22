import type { Entity } from './types';
import { getBankParam1 } from './util';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';

const MetalDonutFloor: Entity = {
	objectSets: [ROOM_TYPE_SETTINGS.fortress.objectSet],
	graphicSets: [ROOM_TYPE_SETTINGS.fortress.objectGraphicSet],
	editorType: 'cell',
	gameType: 'object',
	dimensions: 'xy',
	param1: 'height',
	param2: 'width',
	objectId: 0x28,
	emptyBank: 1,

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
			[80, 82],
			[81, 83],
		],
	},

	toBinary(x, y, w, h) {
		return [getBankParam1(1, h), y, x, this.objectId!, w];
	},
};

export { MetalDonutFloor };
