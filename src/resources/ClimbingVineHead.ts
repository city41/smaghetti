import { StaticResource } from './types';

const ClimbingVineHead: StaticResource = {
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
	tiles: [
		[
			{ romOffset: 0x1724f0, tileIndex: 994 },
			{ romOffset: 0x1724f0, tileIndex: 994, flip: 'h' },
		],
		[
			{ romOffset: 0x1724f0, tileIndex: 1010 },
			{ romOffset: 0x1724f0, tileIndex: 1010, flip: 'h' },
		],
	],
};

export { ClimbingVineHead };
