import type { Entity } from './types';
import { getBankParam1 } from './util';

const UndergroundFlatTerrain_HorizontalTop: Entity = {
	editorType: 'tile',
	gameType: 'object',
	dimensions: 'x',
	param2: 'width',
	objectId: 0x43,
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
				{ romOffset: 0x167674, tileIndex: 782 },
				{ romOffset: 0x167674, tileIndex: 783 },
			],
			[
				{ romOffset: 0x182cb4, tileIndex: 272 },
				{ romOffset: 0x182cb4, tileIndex: 273 },
			],
		],
	},

	toBinary(x, y, w) {
		return [getBankParam1(1, 0), y, x, this.objectId!, w];
	},
};

export { UndergroundFlatTerrain_HorizontalTop };
