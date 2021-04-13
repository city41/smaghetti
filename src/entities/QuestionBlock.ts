import type { Entity } from './types';
import { LevelObject } from '../levelData/parseObjectsFromLevelFile';

const payloadToObjectId = {
	CapeFeather: 0x44,
	CoinSnake: 0x47,
	PWing: 0x55,
	Shoe: 0x43,
};

const QuestionBlock: Entity = {
	type: 'QuestionBlock',
	editorType: 'tile',
	gameType: 'object',
	settingsType: 'single',
	defaultSettings: { payload: 'Coin' },
	dimensions: 'none',
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
		[280, 282],
		[281, 283],
	],

	toBinary(x, y, w, h, settings) {
		const objectId =
			payloadToObjectId[settings.payload as keyof typeof payloadToObjectId];

		return [0, y, x, objectId];
	},

	parseBinary(rawBytes: number[]): LevelObject {
		return {
			bank: (rawBytes[0] >> 6) as 0 | 1,
			id: rawBytes[3],
			x: rawBytes[2],
			y: rawBytes[1],
			width: (rawBytes[0] & 0x3f) + 1,
			height: 1,
			rawBytes,
		};
	},
};

export { QuestionBlock, payloadToObjectId };
