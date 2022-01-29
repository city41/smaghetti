import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const CeilingBuzzyBeetle: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Buzzy Beetle - Ceiling',
		description: 'Drops down and attacks when Mario is below',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, 0, -1, -1, -1],
	objectId: 0x68,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="BuzzyBeetle-bg bg-cover"
				style={{ width: size, height: size, transform: 'scale(1, -1)' }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CeilingBuzzyBeetle };
