import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1HeightParam2Width,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const GlassBlock: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Glass Block',
	},

	objectSets: encodeObjectSets([
		[14, 14],
		[14, 3],
		[3, 14],
		[3, 3],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	param1: 'height',
	param2: 'width',
	objectId: 0x28,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x39ce,
				0x4a52,
				0x6318,
				0x77bd,
				0x732c,
				0x7fd2,
				0x7ffb,
				0xdf7,
				0x267c,
				0x435f,
				0x5bbf,
				0x0,
				0x0,
			],
		],
		romOffset: 0x167674,
		tiles: [
			[864, 866],
			[865, 867],
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
				className="GlassBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { GlassBlock };
