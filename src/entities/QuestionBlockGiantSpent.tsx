import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1WidthParam2Height,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const QuestionBlockGiantSpent: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-giant',
		title: 'Question Block - Giant, Spent',
		description: 'A giant question block that has already been used',
	},

	objectSets: encodeObjectSets([
		[11, 11],
		[13, 11],
		[5, 11],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'double-cell',
	dimensions: 'xy',
	objectId: 0x5,
	param1: 'width',
	param2: 'height',
	emptyBank: 1,
	width: 2,
	height: 2,

	resource: {
		palettes: [
			[
				31775,
				32767,
				0,
				521,
				8846,
				14130,
				18359,
				500,
				666,
				895,
				21,
				3485,
				703,
				13824,
				19109,
				23337,
			],
		],
		tiles: [
			[
				{
					romOffset: 1584308,
					tileIndex: 134,
				},
				909,
				909,
				910,
			],
			[
				932,
				{
					romOffset: 1486172,
					tileIndex: 509,
				},
				{
					romOffset: 1486172,
					tileIndex: 509,
				},
				{
					romOffset: 1584308,
					tileIndex: 133,
				},
			],
			[
				932,
				{
					romOffset: 1486172,
					tileIndex: 509,
				},
				{
					romOffset: 1486172,
					tileIndex: 509,
				},
				{
					romOffset: 1584308,
					tileIndex: 133,
				},
			],
			[948, 968, 968, 951],
		],
		romOffset: 1534952,
	},

	toObjectBinary({ x, y, w, h }) {
		return [getBankParam1(1, w), y, x, this.objectId, h];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1WidthParam2Height(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="QuestionBlockGiantSpent-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE * 2);
	},
};

export { QuestionBlockGiantSpent };
