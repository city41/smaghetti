import type { Entity } from './types';

const TexturedDoor: Entity = {
	type: 'TexturedDoor',
	editorType: 'entity',
	gameType: 'object',
	dimensions: 'none',
	romOffset: 0x20e4f0,
	palette: [
		0x3340,
		0x7fff,
		0x0,
		0x4637,
		0x2ebb,
		0x3f3f,
		0x539f,
		0x0,
		0x0,
		0x2bff,
		0x291e,
		0x297f,
		0x2aff,
		0x0,
		0x0,
		0x0,
	],
	tiles: [
		[108, 109],
		[124, 125],
		[110, 111],
		[126, 127],
	],

	toBinary(x, y) {
		return [0, y, x, 0x46];
	},
};

export { TexturedDoor };
