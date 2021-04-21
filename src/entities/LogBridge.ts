import type { Entity } from './types';
import { getBankParam1 } from './util';

const LogBridge: Entity = {
	editorType: 'tile',
	gameType: 'object',
	dimensions: 'x',
	objectId: 0x21,
	emptyBank: 1,
	param1: 'width',
	romOffset: 0x16ea40,
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
	tiles: [
		[982, 982],
		[983, 983],
	],

	toBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId!];
	},
};

export { LogBridge };
