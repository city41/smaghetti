import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';
import { encodeObjectSets } from '../util';

/**
 * This is a sprite version of the POW block. It has 100% compatibility.
 * The object version was discovered first and is used in a lot of Smaghetti levels,
 * so switching to the sprite one would require a level version migration.
 *
 * So ... for now, capture this for knowledge and to improve hex-tree
 */
const POWBlockSprite: Entity = {
	paletteCategory: 'hextree',
	paletteInfo: {
		title: 'POW Block - Sprite',
		description: 'A sprite version of the POW Block',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xc3,
	emptyBank: 0,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="POWBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { POWBlockSprite };
