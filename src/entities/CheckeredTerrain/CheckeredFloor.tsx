import React from 'react';
import type { Entity } from '../types';
import {
	encodeObjectSets,
	parseCheckeredTerrainCellObjectParamWidth,
} from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const CheckeredFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-checkered',
		title: 'Checkered Floor',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'other',
	param2: 'width',
	objectId: 0x2e,
	emptyBank: 1,
	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,

	resource: {
		romOffset: 0x16ad5c,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x460c,
				0x5a91,
				0x6f35,
				0x7fdb,
				0x11b3,
				0x2a38,
				0x3abc,
				0x2260,
				0x2ac8,
				0x3b4c,
				0x47b0,
				0x2168,
				0x19f5,
			],
		],
		tiles: [
			[488, 489],
			[478, 479],
		],
	},

	toObjectBinary({ x, y, w }) {
		// this is totally different from just about all objects
		// in the entire game
		// docs: https://github.com/city41/smaghetti/wiki/Checkered-terrain
		return [0x47, y, x, this.objectId, w + 1];
	},

	parseObject(data, offset) {
		return parseCheckeredTerrainCellObjectParamWidth(data, offset, 0x47, this);
	},

	simpleRender(size) {
		return (
			<div
				className="CheckeredFloor-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CheckeredFloor };
