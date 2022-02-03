import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const LakituCloudGiant: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-giant',
		title: 'Lakitu Cloud - Giant',
	},

	objectSets: encodeObjectSets([
		[11, 11],
		[13, 11],
		[5, 11],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'double-cell',
	dimensions: 'x',
	objectId: 0x0,
	param1: 'width',
	emptyBank: 1,
	width: 2,
	height: 2,

	resource: {
		palettes: [
			[
				31775,
				32767,
				0,
				26019,
				31371,
				32622,
				32726,
				5524,
				11833,
				17085,
				8800,
				10952,
				15180,
				18352,
				8767,
				22515,
			],
		],
		tiles: [
			[
				908,
				{
					romOffset: 1584308,
					tileIndex: 128,
				},
				{
					romOffset: 1584308,
					tileIndex: 129,
				},
				911,
			],
			[924, 925, 926, 927],
			[940, 941, 942, 943],
			[956, 957, 958, 959],
		],
		romOffset: 1534952,
	},

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Width(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="LakituCloudGiant-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE * 2);
	},
};

export { LakituCloudGiant };
