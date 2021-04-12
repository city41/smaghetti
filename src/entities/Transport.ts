import type { Entity } from './types';

const Transport: Entity = {
	type: 'Transport',
	editorType: 'transport',
	gameType: 'transport',
	dimensions: 'none',
	romOffset: 0x131fe0,
	palette: [
		0x0,
		0x0,
		0x7fff,
		0x5de3,
		0x7aa8,
		0x149e,
		0x25f,
		0x235f,
		0x230d,
		0x0,
		0x0,
		0x0,
		0x63bf,
		0x0,
		0x0,
		0x0,
	],
	tiles: [
		[576, 554],
		[571, 569],
	],

	toBinary() {
		return [];
	},
};

export { Transport };
