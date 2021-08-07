import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { getBaseDoorProperties } from './getBaseDoorProperties';

const SimpleBlackDoor: Entity = {
	...getBaseDoorProperties('SimpleBlackDoor-bg', 0x5),
	paletteInfo: {
		title: 'Simple Black Door',
	},

	objectSets: encodeObjectSets([
		[2, 10],
		[2, 11],
		[2, 12],
		[2, 13],
		[2, 14],
		[2, 15],
		[2, 1],
		[2, 2],
		[2, 3],
		[2, 4],
		[2, 5],
		[2, 6],
		[2, 8],
		[2, 9],
	]),

	resource: {
		palettes: [
			[
				0x23df,
				0x7fff,
				0x0,
				0x4e71,
				0x5ef5,
				0x6f79,
				0x7bdd,
				0x13,
				0x19,
				0x1f,
				0x112,
				0x5a1f,
				0x6ebf,
				0x7f9f,
				0x579f,
				0x6fff,
			],
		],
		romOffset: 0x16ad5c,
		tiles: [
			[{ tileIndex: 474 }, { tileIndex: 474, flip: 'h' }],
			[{ tileIndex: 475 }, { tileIndex: 475, flip: 'h' }],
			[{ tileIndex: 475 }, { tileIndex: 475, flip: 'h' }],
			[
				{ tileIndex: 474, flip: 'v' },
				{ tileIndex: 474, flip: 'hv' },
			],
		],
	},

	toObjectBinary({ x, y }) {
		return [0x40, y, x, this.objectId];
	},
};

export { SimpleBlackDoor };
