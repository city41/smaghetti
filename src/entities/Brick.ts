import type { Entity } from './types';
import { getBankLength } from './util';

const payloadToObjectId = {
	Coin: 0x19,
	CoinCache: 0x1a,
	FireFlower: 0x16,
	Leaf: 0x17,
	OneUpMushroom: 0x1b,
	StarMan: 0x18,
	PSwitch: 0x1d,
	ClimbingVineHead: 0x1c,
};

const Brick: Entity = {
	type: 'Brick',
	editorType: 'tile',
	gameType: 'object',
	settingsType: 'single',
	dimensions: 'xy',
	objectId: 0xf,
	param1: 'width',
	param2: 'height',
	romOffset: 0x131fe0,
	palette: [
		0x7f96,
		0x7fff,
		0x0,
		0x209,
		0x228e,
		0x3732,
		0x47b7,
		0x1f4,
		0x29a,
		0x37f,
		0x15,
		0xd9d,
		0x2bf,
		0x3600,
		0x4aa5,
		0x5b29,
	],
	tiles: [
		[308, 310],
		[309, 311],
	],

	toBinary(x, y, w, h, settings): number[] {
		if (settings.payload in payloadToObjectId) {
			// if there is a payload then need to split this up into individual brick objects

			let binaries: number[] = [];
			const objectId =
				payloadToObjectId[settings.payload as keyof typeof payloadToObjectId];

			for (let by = 0; by < h + 1; ++by) {
				for (let bx = 0; bx < w + 1; ++bx) {
					binaries = binaries.concat([0, y + by, x + bx, objectId]);
				}
			}

			return binaries;
		} else {
			return [getBankLength(1, w), y, x, this.objectId!, h];
		}
	},
};

export { Brick, payloadToObjectId };
