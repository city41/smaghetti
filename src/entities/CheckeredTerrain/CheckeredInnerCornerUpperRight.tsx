import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, parseSimpleCheckeredTerrainObject } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const CheckeredInnerCornerUpperRight: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-checkered',
		title: 'Checkered Inner Corner - Upper Right',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	param1: 'other',
	param2: 'other',
	objectId: 0x2e,
	emptyBank: 1,
	objectSets: encodeObjectSets(objectSets),
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
			[
				{
					romOffset: 1253344,
					tileIndex: 262,
				},
				477,
			],
			[495, 479],
		],
		romOffset: 1486172,
	},

	toObjectBinary({ x, y }) {
		// this is totally different from just about all objects
		// in the entire game
		// docs: https://github.com/city41/smaghetti/wiki/Checkered-terrain
		return [0x43, y, x, this.objectId, 1];
	},

	parseObject(data, offset) {
		return parseSimpleCheckeredTerrainObject(data, offset, 0x43, this);
	},

	simpleRender(size) {
		return (
			<div
				className="CheckeredInnerCornerUpperRight-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CheckeredInnerCornerUpperRight };
