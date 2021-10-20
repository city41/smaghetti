import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Height,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const GrassVerticalRight: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Grass - Vertical Right',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'y',
	param1: 'height',
	objectId: 0xd,
	emptyBank: 1,
	objectSets: encodeObjectSets([[14, 3]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x22d,
				0x1271,
				0x26f5,
				0x3779,
				0x6623,
				0x7b2e,
				0x7fd6,
				0x1132,
				0x1996,
				0x263b,
				0x2e9e,
				0x0,
				0x0,
			],
		],
		tiles: [
			[
				{ romOffset: 0x167674, tileIndex: 788, flip: 'h' },
				{ romOffset: 0x182cb4, tileIndex: 256, flip: 'h' },
			],
			[
				{ romOffset: 0x167674, tileIndex: 789, flip: 'h' },
				{ romOffset: 0x182cb4, tileIndex: 272, flip: 'h' },
			],
		],
	},

	toObjectBinary({ x, y, h }) {
		return [getBankParam1(1, h), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Height(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="GrassVerticalRight-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { GrassVerticalRight };
