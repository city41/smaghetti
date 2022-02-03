import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1WidthParam2Height,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const WoodBlockGiant: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-giant',
		title: 'Wood Block - Giant',
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
	objectId: 0x4,
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
				379,
				6687,
				12959,
				19327,
				13924,
				18186,
				24497,
				3443,
				6648,
				11869,
				16095,
				0,
				0,
			],
		],
		tiles: [
			[768, 769, 769, 770],
			[784, 785, 785, 786],
			[800, 801, 801, 802],
			[816, 817, 817, 818],
		],
		romOffset: 1455976,
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
				className="WoodBlockGiant-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE * 2);
	},
};

export { WoodBlockGiant };
