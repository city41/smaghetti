import type { Entity } from './types';

const payloadToObjectId = {
	FireFlower: 0x21,
	Leaf: 0x22,
	StarMan: 0x23,
};

const MusicBlock: Entity = {
	type: 'MusicBlock',
	editorType: 'tile',
	gameType: 'object',
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
		const objectId =
			payloadToObjectId[settings.payload as keyof typeof payloadToObjectId];

		return [0, y, x, objectId];
	},
};

export { MusicBlock, payloadToObjectId };
