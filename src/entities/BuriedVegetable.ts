import type { Entity } from './types';
import { getBankParam1 } from './util';

const BuriedVegetable: Entity = {
	editorType: 'cell',
	gameType: 'object',
	settingsType: 'single',
	defaultSettings: { payload: 'SmallVegetable' },
	dimensions: 'none',
	// empty veggie, nothing comes up
	objectId: 0x66,
	payloadBank: 1,
	emptyBank: 1,
	payloadToObjectId: {
		Coin: 0x63,
		CoinCache: 0x64,
		GiantVegetable: 0x5a,
		KoopaShell: 0x7e,
		// does not work with underground graphic set
		// MontyMole: 0x69,
		OneUpMushroom: 0x65,
		PoisonMushroom: 0x67,
		RegularVegetable: 0x5b,
		SmallVegetable: 0x5c,
	},

	resource: {
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
		romOffset: 0x20e4f0,
		tiles: [
			[74, 75],
			[46, 47],
		],
	},

	toBinary(x, y, _w, _h, settings) {
		const payloadToObjectId = this.payloadToObjectId!;

		const objectId =
			payloadToObjectId[settings.payload as keyof typeof payloadToObjectId]! ??
			this.objectId!;

		return [getBankParam1(1, 0), y, x, objectId];
	},
};

export { BuriedVegetable };
