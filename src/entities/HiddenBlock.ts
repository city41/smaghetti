import type { Entity } from './types';

const payloadToObjectId = {
	MusicBlock: 0x20,
	OneUpMushroom: 0x1f,
	Coin: 0x1e,
};

const HiddenBlock: Entity = {
	type: 'HiddenBlock',
	editorType: 'tile',
	gameType: 'object',
	settingsType: 'single',
	defaultSettings: { payload: 'MusicBlock' },
	dimensions: 'none',
	romOffset: 0x16ea40,
	palette: [],
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
