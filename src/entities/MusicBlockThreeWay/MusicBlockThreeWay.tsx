import type { Entity } from '../types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
} from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { objectSets } from './objectSets';

const MusicBlockThreeWay: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Note Block - Three Way',
		description: 'Bounces Mario around from the sides and top',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: [-1, 0, -1, -1, -1, -1],
	layer: 'stage',
	editorType: 'cell',

	defaultSettings: {},
	dimensions: 'x',
	objectId: 0x13,
	payloadBank: 0,
	emptyBank: 1,
	param1: 'width',

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x65a3,
				0x7a8b,
				0x7f6e,
				0x7fd6,
				0x1594,
				0x2e39,
				0x42bd,
				0x11,
				0x16,
				0x1a,
				0xdbe,
				0x123f,
				0x2bf,
			],
		],
		romOffset: 0x131fe0,
		tiles: [
			[312, 314],
			[313, 315],
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
				className="MusicBlockThreeWay-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { MusicBlockThreeWay };
