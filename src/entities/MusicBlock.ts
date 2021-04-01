import type { ObjectEntity } from './types';
import { getBankLength } from './util';

const OBJECT_ID = 0xf;

const payloadToObjectId = {
	FireFlower: 0x21,
	Leaf: 0x22,
	StarMan: 0x23,
};

const MusicBlock: ObjectEntity = {
	type: 'MusicBlock',
	mode: 'Object',
	settingsType: 'single',
	defaultSettings: { payload: 'FireFlower' },
	dimensions: 'none',
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
		[312, 314],
		[313, 315],
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
			return [getBankLength(1, w), y, x, OBJECT_ID, h];
		}
	},
};

export { MusicBlock, payloadToObjectId };
