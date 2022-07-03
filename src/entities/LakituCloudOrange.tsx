import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const LakituCloudOrange: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Lakitu Cloud - Orange',
	},

	objectSets: encodeObjectSets([[9, 9]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'width',
	objectId: 0x32,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x017b,
				0x1a1f,
				0x329f,
				0x4b7f,
				0x2e24,
				0x46c9,
				0x634d,
				0x3192,
				0x1636,
				0x2a9c,
				0x42ff,
				0x0,
				0x0,
			],
		],
		romOffset: 0x163768,
		tiles: [
			[528, 529],
			[548, 569],
		],
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
				className="LakituCloudOrange-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { LakituCloudOrange };
