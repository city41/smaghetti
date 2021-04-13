import type { Entity } from './types';
import { getBankLength } from './util';

const payloadToObjectId = {
	SmallVegetable: 0x5c,
	RegularVegetable: 0x5b,
	GiantVegetable: 0x5a,
	Coin: 0x63,
	CoinCache: 0x64,
	OneUpMushroom: 0x65,
	PoisonMushroom: 0x67,
	KoopaShell: 0x7e,
};

const BuriedVegetable: Entity = {
	type: 'BuriedVegetable',
	editorType: 'tile',
	gameType: 'object',
	settingsType: 'single',
	defaultSettings: { payload: 'SmallVegetable' },
	dimensions: 'none',
	romOffset: 0x20e4f0,
	palette: [
		0x7f40,
		0x7fff,
		0x0,
		0x7629,
		0x7f30,
		0x7fd2,
		0x7ffb,
		0x2e39,
		0x42bd,
		0x535f,
		0x3708,
		0x3f6d,
		0x4bd1,
		0x5bf4,
		0x36df,
		0x6bf8,
	],
	tiles: [
		[74, 75],
		[46, 47],
	],

	toBinary(x, y, w, h, settings) {
		const objectId =
			payloadToObjectId[settings.payload as keyof typeof payloadToObjectId];

		return [getBankLength(1, 0), y, x, objectId];
	},
};

export { BuriedVegetable, payloadToObjectId };
