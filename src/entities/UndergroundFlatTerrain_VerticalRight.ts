import type { Entity } from './types';
import { getBankParam1 } from './util';

const UndergroundFlatTerrain_VerticalRight: Entity = {
	editorType: 'cell',
	gameType: 'object',
	dimensions: 'y',
	param1: 'height',
	objectId: 0xd,
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x22d,
			0x1271,
			0x26f5,
			0x3779,
			0x6623,
			0x7b2e,
			0x7fd6,
			0x1132,
			0x1996,
			0x263b,
			0x2e9e,
			0x0,
			0x0,
		],
		tiles: [
			[
				{ romOffset: 0x167674, tileIndex: 788, flip: 'h' },
				{ romOffset: 0x182cb4, tileIndex: 256, flip: 'h' },
			],
			[
				{ romOffset: 0x167674, tileIndex: 789, flip: 'h' },
				{ romOffset: 0x182cb4, tileIndex: 272, flip: 'h' },
			],
		],
	},

	toBinary(x, y, w) {
		return [getBankParam1(1, 0), y, x, this.objectId!, w];
	},
};

export { UndergroundFlatTerrain_VerticalRight };
