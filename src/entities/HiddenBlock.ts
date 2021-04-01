import type { ObjectEntity } from './types';

const payloadToObjectId = {
	MusicBlock: 0x20,
	OneUpMushroom: 0x1f,
	Coin: 0x1e,
};

const HiddenBlock: ObjectEntity = {
	type: 'HiddenBlock',
	mode: 'Object',
	settingsType: 'single',
	defaultSettings: { payload: 'MusicBlock' },
	dimensions: 'none',
	romOffset: 0x16ea40,
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
		// HACK: since this block is hidden, it doesn't actually
		// have any graphics, so these are empty tiles, just to
		// satisfy the current constraints
		[250, 250],
		[250, 250],
	],

	toBinary(x, y, w, h, settings): number[] {
		const objectId =
			payloadToObjectId[settings.payload as keyof typeof payloadToObjectId];

		return [0, y, x, objectId];
	},
};

export { HiddenBlock, payloadToObjectId };
