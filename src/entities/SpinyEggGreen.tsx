import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const SpinyEggGreen: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Spiny Egg - Green',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		-1,
		graphicSets,
		graphicSets,
		graphicSets,
	],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x85,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="GreenSpinyEgg-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { SpinyEggGreen };
