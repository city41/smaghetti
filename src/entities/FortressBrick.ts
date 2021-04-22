import type { Entity } from './types';
import { getBankParam1 } from './util';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';

const FortressBrick: Entity = {
	objectSets: [ROOM_TYPE_SETTINGS.fortress.objectSet],
	graphicSets: [ROOM_TYPE_SETTINGS.fortress.objectGraphicSet],
	editorType: 'cell',
	gameType: 'object',
	dimensions: 'xy',
	objectId: 0xd,
	emptyBank: 1,
	param1: 'height',
	param2: 'width',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x520c,
			0x6270,
			0x72f3,
			0x7b77,
			0x1f4,
			0x29a,
			0x37f,
			0x7e93,
			0x7f17,
			0x7fbc,
			0x7ffe,
			0x1df,
			0x31f,
		],
		romOffset: 0x163768,
		tiles: [
			[
				{
					romOffset: 0x163768,
					tileIndex: 526,
				},
				{
					romOffset: 0x163768,
					tileIndex: 615,
				},
			],
			[
				{
					romOffset: 0x167674,
					tileIndex: 1,
				},
				{ romOffset: 0x167674, tileIndex: 3 },
			],
		],
	},

	toBinary(x, y, w, h): number[] {
		return [getBankParam1(1, h), y, x, this.objectId!, w];
	},
};

export { FortressBrick };
