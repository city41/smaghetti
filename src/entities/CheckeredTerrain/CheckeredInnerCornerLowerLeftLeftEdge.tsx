import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, parseSimpleObject } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';

const CheckeredInnerCornerLowerLeftLeftEdge: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-checkered',
		title: 'Checkered InnerCorner- Lower Left, Left Edge',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	param1: 'other',
	param2: 'width',
	objectId: 0x4f,
	emptyBank: 1,
	objectSets: encodeObjectSets([
		[10, 10],
		[10, 11],
		[10, 12],
		[10, 13],
		[10, 14],
		[10, 15],
		[10, 1],
		[10, 2],
		[10, 3],
		[10, 4],
		[10, 5],
		[10, 6],
		[10, 8],
		[10, 9],
		[12, 10],
		[12, 11],
		[12, 12],
		[12, 13],
		[12, 14],
		[12, 1],
		[12, 2],
		[12, 3],
		[12, 4],
		[12, 5],
		[12, 6],
		[12, 8],
		[12, 9],
		[13, 10],
		[13, 11],
		[13, 12],
		[13, 13],
		[13, 14],
		[13, 15],
		[13, 1],
		[13, 2],
		[13, 3],
		[13, 4],
		[13, 5],
		[13, 6],
		[13, 8],
		[13, 9],
		[4, 10],
		[4, 11],
		[4, 12],
		[4, 13],
		[4, 14],
		[4, 1],
		[4, 2],
		[4, 3],
		[4, 4],
		[4, 5],
		[4, 6],
		[4, 8],
		[4, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,

	resource: {
		palettes: [
			[
				32662,
				32767,
				0,
				17932,
				23185,
				28469,
				32731,
				4531,
				10808,
				15036,
				8800,
				10952,
				15180,
				18352,
				8552,
				6645,
			],
		],
		tiles: [
			[492, 502],
			[493, 479],
		],
		romOffset: 1486172,
	},

	toObjectBinary({ x, y }) {
		// this is totally different from just about all objects
		// in the entire game
		// docs: https://github.com/city41/smaghetti/wiki/Checkered-terrain
		return [1, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 7, this);
	},

	simpleRender(size) {
		return (
			<div
				className="CheckeredInnerCornerLowerLeftLeftEdge-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CheckeredInnerCornerLowerLeftLeftEdge };
