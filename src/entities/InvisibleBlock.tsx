import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';

const InvisibleBlock: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Invisible Block',
		description: 'A block you can stand on, but is invisible.',
	},

	objectSets: [ROOM_TYPE_SETTINGS.underground.objectSet],
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x9,
	emptyBank: 0,

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId!];
	},

	simpleRender(width, height) {
		return <div style={{ width, height, border: '1px dotted white' }} />;
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { InvisibleBlock };
