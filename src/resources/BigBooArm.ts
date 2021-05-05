import { StaticResource } from './types';

const BigBooArm: StaticResource = {
	romOffset: 0x18a6e4,
	palette: [0x75ad, 0x7fff, 0x0, 0x7b9d, 0x7fbe, 0x7fdf, 0x25de, 0x7fde],
	tiles: [
		[
			{ tileIndex: 39, flip: 'h' },
			{ tileIndex: 38, flip: 'h' },
		],
		[
			{ tileIndex: 55, flip: 'h' },
			{ tileIndex: 54, flip: 'h' },
		],
	],
};

export { BigBooArm };
