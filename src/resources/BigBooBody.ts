import { StaticResource } from './types';

const BigBooBody: StaticResource = {
	romOffset: 0x18c914,
	palette: [0x75ad, 0x7fff, 0x0, 0x7b9d, 0x7fbe, 0x7fdf, 0x25de, 0x7fde],
	tiles: [
		[272, 273, 274, 275, 276, 277, 278, 272],
		[304, 305, 306, 307, 308, 309, 310, 272],
		[336, 337, 338, 339, 340, 341, 342, 272],
		[368, 369, 370, 371, 372, 373, 374, 375],
		[
			{ tileIndex: 368, flip: 'v' },
			{ tileIndex: 369, flip: 'v' },
			{ tileIndex: 370, flip: 'v' },
			{ tileIndex: 371, flip: 'v' },
			{ tileIndex: 372, flip: 'v' },
			272,
			272,
			272,
		],
		[
			{ tileIndex: 336, flip: 'v' },
			{ tileIndex: 337, flip: 'v' },
			{ tileIndex: 338, flip: 'v' },
			{ tileIndex: 339, flip: 'v' },
			{ tileIndex: 340, flip: 'v' },
			272,
			272,
			272,
		],
		[
			{ tileIndex: 304, flip: 'v' },
			{ tileIndex: 305, flip: 'v' },
			{ tileIndex: 306, flip: 'v' },
			{ tileIndex: 307, flip: 'v' },
			{ tileIndex: 308, flip: 'v' },
			272,
			272,
			272,
		],
		[
			{ tileIndex: 272, flip: 'v' },
			{ tileIndex: 273, flip: 'v' },
			{ tileIndex: 274, flip: 'v' },
			{ tileIndex: 275, flip: 'v' },
			{ tileIndex: 276, flip: 'v' },
			272,
			272,
			272,
		],
	],
};

export { BigBooBody };
