import type { Entity } from '../types';
import { encodeObjectSets } from '../util';
import { objectSets } from './objectSets';
import { getBaseDoorProperties } from '../getBaseDoorProperties';

const WoodDoor2: Entity = {
	...getBaseDoorProperties('WoodDoor-bg', 0x4),
	paletteInfo: {
		title: 'Wood Door - alternate',
		description:
			'Both wood doors behave the same, they just have different compatibilities.',
	},

	objectSets: encodeObjectSets(objectSets),
};

export { WoodDoor2 };
