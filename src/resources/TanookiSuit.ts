import { StaticResource } from './types';

const TanookiSuit: StaticResource = {
	palettes: [
		[
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
	],
	romOffset: 0x163768,
	tiles: [
		[321, { romOffset: 0x163768, tileIndex: 321, flip: 'h' }],
		[337, { romOffset: 0x163768, tileIndex: 337, flip: 'h' }],
	],
};

export { TanookiSuit };
