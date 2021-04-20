import type { Entity } from './types';
import { LevelObject } from '../levelData/parseObjectsFromLevelFile';
import { getBankParam1 } from './util';

const QuestionBlock: Entity = {
	type: 'QuestionBlock',
	editorType: 'tile',
	gameType: 'object',
	settingsType: 'single',
	defaultSettings: {},
	dimensions: 'x',
	romOffset: 0x131fe0,
	objectId: 0x10,
	param1: 'width',
	payloadToObjectId: {
		CapeFeather: 0x44,
		CoinSnake: 0x47,
		Leaf: 0x11,
		FireFlower: 0x10,
		PWing: 0x55,
		Shoe: 0x43,
	},
	emptyBank: 1,
	payloadBank: 0,
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
		[280, 282],
		[281, 283],
	],

	toBinary(x, y, w, h, settings) {
		const payloadToObjectId = this.payloadToObjectId!;

		if (settings.payload in payloadToObjectId) {
			// if there is a payload then need to split this up into individual QuestionBlock objects

			let binaries: number[] = [];
			const objectId = payloadToObjectId[
				settings.payload as keyof typeof payloadToObjectId
			]!;

			for (let by = 0; by < h + 1; ++by) {
				for (let bx = 0; bx < w + 1; ++bx) {
					binaries = binaries.concat([0, y + by, x + bx, objectId]);
				}
			}

			return binaries;
		} else {
			return [getBankParam1(1, w), y, x, this.objectId!];
		}
	},

	parseBinary(rawBytes: number[]): LevelObject {
		return {
			bank: (rawBytes[0] >> 6) as 0 | 1,
			id: rawBytes[3],
			x: rawBytes[2],
			y: rawBytes[1],
			param1: (rawBytes[0] & 0x3f) + 1,
			param2: 1,
			rawBytes,
		};
	},
};

export { QuestionBlock };
