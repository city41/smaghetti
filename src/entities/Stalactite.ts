import type { Entity } from './types';

const OBJECT_ID = 0x49;

// TODO: should this be called spike?
const Stalactite: Entity = {
	editorType: 'cell',
	gameType: 'object',
	dimensions: 'none',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x520c,
			0x6270,
			0x72f3,
			0x7b77,
			0x1f4,
			0x29a,
			0x37f,
			0x7e93,
			0x7f17,
			0x7fbc,
			0x7ffe,
			0x1df,
			0x31f,
		],
		romOffset: 0x16ea40,
		tiles: [
			[122, 250],
			[123, 250],
		],
	},

	toBinary(x, y) {
		return [0, y, x, OBJECT_ID];
	},
};

export { Stalactite };
