import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
} from './util';

const Stalagmite: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Stalagmite',
	},

	objectSets: encodeObjectSets([
		[8, 5],
		[8, 6],
		[8, 8],
		[6, 5],
		[6, 6],
		[6, 8],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0x38,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	emptyBank: 1,
	param1: 'width',

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Width(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="Stalactite-bg bg-cover transform rotate-180"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Stalagmite };
