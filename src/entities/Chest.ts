import type { Entity } from './types';

const Chest: Entity = {
	type: 'Chest',
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { payload: 'TanookiSuitInChest' },
	romOffset: 0x163768,
	objectId: 0x8,
	payloadToObjectId: {
		FrogSuitInChest: 4,
		TanookiSuitInChest: 5,
	},
	palette: [
		0x7f96,
		0x7fff,
		0x18c6,
		0x101a,
		0x10bf,
		0x125f,
		0x25fd,
		0x369e,
		0x475f,
		0x139f,
		0x177,
		0x21c,
		0x29f,
		0x47bf,
		0x137f,
		0x25f,
	],
	tiles: [
		[357, 358],
		[373, 374],
	],

	toBinary(x, y, w, h, settings) {
		const payloadToObjectId = this.payloadToObjectId!;

		if (settings.payload in payloadToObjectId) {
			const payloadId =
				payloadToObjectId[settings.payload as keyof typeof payloadToObjectId] ??
				payloadToObjectId.TanookiSuitInChest;

			return [1, this.objectId!, x, y, payloadId!];
		} else {
			return [1, this.objectId!, x, y];
		}
	},
};

export { Chest };
