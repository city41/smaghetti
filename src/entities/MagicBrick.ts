import type { Entity } from './types';
import { getBankParam1 } from './util';

const MagicBrick: Entity = {
	type: 'MagicBrick',
	editorType: 'tile',
	gameType: 'object',
	settingsType: 'single',
	dimensions: 'xy',
	objectId: 0x2b,
	param1: 'width',
	param2: 'height',
	emptyBank: 1,
	romOffset: 0x131fe0,
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
		0x5810,
		0x7597,
		0x7e1d,
		0x0,
		0x0,
		0x0,
	],
	tiles: [
		[308, 310],
		[309, 311],
	],

	toBinary(x, y, w, h, settings): number[] {
		return [getBankParam1(1, w), y, x, this.objectId!, h];
	},
};

export { MagicBrick };
