import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const PWing: Entity = {
	paletteCategory: 'power-up',
	paletteInfo: {
		title: 'P-Wing',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, 0, -1],
	objectId: 0x3,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	toSpriteBinary({ x, y }) {
		return [1, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 1, this);
	},

	simpleRender(size) {
		return (
			<div
				className="PWing-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { PWing };
