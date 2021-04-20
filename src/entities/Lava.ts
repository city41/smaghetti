import type { Entity } from './types';
import { getBankParam1 } from './util';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';

const Lava: Entity = {
	objectSets: [ROOM_TYPE_SETTINGS.fortress.objectSet],
	graphicSets: [ROOM_TYPE_SETTINGS.fortress.objectGraphicSet],
	type: 'Lava',
	editorType: 'tile',
	gameType: 'object',
	settingsType: 'single',
	dimensions: 'xy',
	objectId: 0x30,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,
	romOffset: 0x131fe0,
	palette: [
		0x7f96,
		0x7fff,
		0x0,
		0x65a3,
		0x7a8b,
		0x7f6e,
		0x7fd6,
		0x1594,
		0x2e39,
		0x42bd,
		0x11,
		0x16,
		0x1a,
		0xdbe,
		0x123f,
		0x2bf,
	],
	tiles: [
		[264, 266],
		[265, 267],
	],

	toBinary(x, y, w, h, settings): number[] {
		return [getBankParam1(1, h), y, x, this.objectId!, w];
	},
};

export { Lava };
