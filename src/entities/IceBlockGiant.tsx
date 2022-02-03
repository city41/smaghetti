import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1WidthParam2Height,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const IceBlockGiant: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-winter',
		title: 'Ice Block - Giant',
	},

	// [4,12] is "kool-aid block"
	objectSets: encodeObjectSets([[12, 12]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'double-cell',
	dimensions: 'x',
	objectId: 0x34,
	param1: 'width',
	emptyBank: 1,
	width: 2,
	height: 2,

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
			[532, 533, 540, 541],
			[548, 549, 556, 557],
			[588, 589, 590, 591],
			[526, 527, 542, 543],
		],
	},

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, this.objectId, 0];
	},

	parseObject(data, offset) {
		// TODO: param2 is not actually height, so far, don't know what param2 is
		// it seems to have no impact, but Nintendo makes it various different values
		return parseCellObjectsParam1WidthParam2Height(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="IceBlockGiant-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE * 2);
	},
};

export { IceBlockGiant };
