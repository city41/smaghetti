import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const FlowerBushAlternate: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Flower Bush - Alternate',
		description: 'A Flower Bush that is compatible with different things',
	},

	objectSets: encodeObjectSets([[1, 1]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'width',
	objectId: 0x8,
	emptyBank: 1,

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Width(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="FlowerBush-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { FlowerBushAlternate };
