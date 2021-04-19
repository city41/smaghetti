import type { Entity } from './types';
import { getBankParam1 } from './util';

const YellowSwitchBrick: Entity = {
	type: 'YellowSwitchBrick',
	editorType: 'tile',
	gameType: 'object',
	dimensions: 'x',
	objectId: 0x56,
	param1: 'width',
	emptyBank: 1,
	romOffset: 0x20e4f0,
	palette: [
		0x7f96,
		0x27df,
		0x0,
		0x56bf,
		0x433f,
		0x0,
		0x0,
		0x0,
		0x0,
		0x0,
		0x0,
		0x0,
		0x0,
		0x0,
		0x0,
		0x0,
	],
	tiles: [
		[10, 11],
		[12, 13],
	],

	toBinary(x, y, w): number[] {
		return [getBankParam1(1, w), y, x, this.objectId!];
	},
};

export { YellowSwitchBrick };
