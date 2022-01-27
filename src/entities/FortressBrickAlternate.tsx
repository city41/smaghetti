import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1HeightParam2Width,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const FortressBrickAlternate: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Fortress Brick - Alternate',
		description: 'A Fortress Brick that is compatible with different things',
	},

	objectSets: encodeObjectSets([
		[1, 1],
		[11, 11],
		[11, 13],
		[13, 11],
		[13, 13],
		[5, 11],
		[5, 13],
		[9, 9],
		[8, 5],
		[8, 6],
		[8, 8],
		[6, 5],
		[6, 6],
		[6, 8],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x28,
	emptyBank: 1,
	param1: 'height',
	param2: 'width',

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x520c,
				0x6270,
				0x72f3,
				0x7b77,
				0x1f4,
				0x29a,
				0x37f,
				0x7e93,
				0x7f17,
				0x7fbc,
				0x7ffe,
				0x1df,
				0x31f,
			],
		],
		romOffset: 0x163768,
		tiles: [
			[
				{
					romOffset: 0x163768,
					tileIndex: 526,
				},
				{
					romOffset: 0x163768,
					tileIndex: 615,
				},
			],
			[
				{
					romOffset: 0x167674,
					tileIndex: 1,
				},
				{ romOffset: 0x167674, tileIndex: 3 },
			],
		],
	},

	toObjectBinary({ x, y, w, h }) {
		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1HeightParam2Width(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="FortressBrick-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { FortressBrickAlternate };
