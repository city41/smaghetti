import type { Entity } from './types';

const Transport: Entity = {
	editorType: 'transport',
	gameType: 'transport',
	dimensions: 'none',

	toBinary() {
		return [];
	},
};

export { Transport };
