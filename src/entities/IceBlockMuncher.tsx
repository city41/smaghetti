import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1WidthParam2Height,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const IceBlockMuncher: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-winter',
		title: 'Ice Block - Muncher',
	},

	// hoo, so limited :(
	objectSets: encodeObjectSets([[12, 12]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x2e,
	param1: 'width',
	param2: 'height',
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x3229,
				0x46ae,
				0x5752,
				0x6bd7,
				0x1f4,
				0x29a,
				0x37f,
				0x69b1,
				0x76b6,
				0x7fd9,
				0x67f9,
				0x7e3d,
				0x7f5f,
			],
		],
		romOffset: 0x167674,
		tiles: [
			[596, 598],
			[597, 599],
		],
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
				className="IceBlockMuncher-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { IceBlockMuncher };
