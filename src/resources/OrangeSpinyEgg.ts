import { StaticResource } from './types';

const OrangeSpinyEgg: StaticResource = {
	palette: [
		0x7f96,
		0x7fff,
		0x18c6,
		0x11dc,
		0x169e,
		0x1b5f,
		0x25fd,
		0x369e,
		0x475f,
		0x111d,
		0x1a1f,
		0x329f,
		0x4b7f,
		0x7bda,
		0x6b55,
		0x56b1,
	],
	romOffset: 0x163768,
	tiles: [
		[
			{ tileIndex: 765, flip: 'v' },
			{ tileIndex: 749, flip: 'h' },
		],
		[
			{ tileIndex: 749, flip: 'v' },
			{ tileIndex: 765, flip: 'h' },
		],
	],
};

export { OrangeSpinyEgg };
