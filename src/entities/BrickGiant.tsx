import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1WidthParam2Height,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

const BrickGiant: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-giant',
		title: 'Brick - Giant',
		warning:
			"If you place this on an odd x location, it won't break correctly when Super Mario smashes it",
	},

	objectSets: encodeObjectSets([
		[11, 11],
		[13, 11],
		[5, 11],
	]),
	spriteGraphicSets: [-1, -1, -1, -1, 1, -1],
	layer: 'stage',
	editorType: 'double-cell',
	dimensions: 'xy',
	objectId: 0x1,
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
			[896, 897, 898, 896],
			[912, 913, 914, 912],
			[928, 929, 930, 931],
			[944, 945, 946, 947],
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
				className="BrickGiant-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE * 2);
	},
};

export { BrickGiant };
