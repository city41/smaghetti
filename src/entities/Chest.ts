import type { Entity } from './types';

const Chest: Entity = {
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { payload: 'Mushroom' },
	romOffset: 0x163768,
	objectId: 0x8,
	payloadToObjectId: {
		Mushroom: 1,
		FireFlower: 2,
		FrogSuit: 4,
		TanookiSuit: 5,
		//HammerBrosSuit: 6
		//LakituCloud: 7
		PWing: 8,
		StarMan: 9,
		// Anchor: 0xa,
		// Hammer: 0xb,
		// Flute: 0xc,
		// MusicBox: 0xd,
		CapeFeather: 0xe,
		// Boomerang: 0xf,
		// OneUp: 0x10 // note this is not a 1up mushroom, just an immediate 1up
		// ThreeUp: 0x11 // note this is not a 3up moon, just an immediate 3up
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

	toBinary(x, y, _w, _h, settings) {
		const payloadToObjectId = this.payloadToObjectId!;

		if (settings.payload in payloadToObjectId) {
			const payloadId =
				payloadToObjectId[settings.payload as keyof typeof payloadToObjectId];

			return [1, this.objectId!, x, y, payloadId!];
		} else {
			return [1, this.objectId!, x, y];
		}
	},
};

export { Chest };
