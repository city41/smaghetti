import type { Entity } from '../types';
import { encodeObjectSets } from '../util';
import { objectSets } from './objectSets';
import { getBaseDoorProperties } from '../getBaseDoorProperties';

const TexturedDoor: Entity = {
	...getBaseDoorProperties('TexturedDoor-bg', 0x46),
	paletteInfo: {
		title: 'Textured Door',
	},

	objectSets: encodeObjectSets(objectSets),

	resource: {
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
		romOffset: 0x20e4f0,
		tiles: [
			[108, 109],
			[124, 125],
			[110, 111],
			[126, 127],
		],
	},
};

export { TexturedDoor };
