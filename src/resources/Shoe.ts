import { StaticResource } from './types';

const Shoe: StaticResource = {
	palette: [
		0x7f96,
		0x7fff,
		0x18c6,
		0x26b,
		0x1b10,
		0x13b4,
		0x25fd,
		0x369e,
		0x475f,
		0x1abf,
		0x1c,
		0x253f,
		0x463f,
		0x7ad1,
		0x6e2c,
		0x59a6,
	],
	tiles: [
		[
			{ romOffset: 0x163768, tileIndex: 740 },
			{ romOffset: 0x163768, tileIndex: 742 },
		],
		[
			{ romOffset: 0x163768, tileIndex: 756 },
			{ romOffset: 0x163768, tileIndex: 757 },
		],
	],
};

export { Shoe };
