import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { graphicSetValues } from './BowserFireGenerator';

const BowserFireball: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Bowser Fireball',
		description: 'A single fireball, use the generator for lots of them',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, graphicSetValues, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x75,

	toSpriteBinary(x, y) {
		// return [0, this.objectId, x, y];
		return [0, 0x75, x, y];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 66%' };
		return (
			<div
				className="BowserFireGenerator-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 1.5, height: TILE_SIZE };

		return <div style={style} className="BowserFireGenerator-bg bg-cover" />;
	},
};

export { BowserFireball };
