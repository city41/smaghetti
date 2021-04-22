import type { Entity } from './types';
import { getBankParam1 } from './util';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';

const ConveyorBelt: Entity = {
	objectSets: [ROOM_TYPE_SETTINGS.fortress.objectSet],
	graphicSets: [ROOM_TYPE_SETTINGS.fortress.objectGraphicSet],
	editorType: 'cell',
	gameType: 'object',
	dimensions: 'x',
	param1: 'width',
	objectId: 0x32,
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x15d2,
			0x2257,
			0x2afc,
			0x37be,
			0x20ba,
			0x21be,
			0x32df,
			0x3192,
			0x1636,
			0x2a9c,
			0x42ff,
			0x0,
			0x0,
		],
		romOffset: 0x131fe0,
		tiles: [
			[304, 304],
			[304, 304],
		],
	},

	toBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId!];
	},
};

export { ConveyorBelt };
