import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET } from '../constants';
import { spriteGraphicSets } from './spriteGraphicSets';

const PodobooCeiling: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Podoboo - Ceiling',
		description: 'Best placed just above the screen.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x53,

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="Podoboo-bg bg-cover"
				style={{ width: size, height: size, transform: 'scale(1, -1)' }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { PodobooCeiling };
