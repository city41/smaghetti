import type { Entity } from './types';

const PSwitch: Entity = {
	editorType: 'tile',
	gameType: 'object',
	dimensions: 'none',
	objectId: 0x28,
	emptyBank: 0,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x65a3,
			0x7a8b,
			0x7f6e,
			0x7fd6,
			0x1594,
			0x2e39,
			0x42bd,
			0xd1,
			0x175,
			0x23b,
			0x2be,
			0x223f,
			0x371f,
		],
		romOffset: 0x16ea40,
		tiles: [
			[992, 994],
			[993, 995],
		],
	},

	toBinary(x, y) {
		return [0, y, x, this.objectId!];
	},
};

export { PSwitch };
