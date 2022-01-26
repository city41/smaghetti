import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets, parseSimpleObject } from './util';

const DirectionalLiftUp: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Directional Lift - Up',
		warning:
			'Will only work in a wrap-around room. In a regular room, it is just a static platform.',
	},

	objectSets: encodeObjectSets([
		[6, 5],
		[6, 6],
		[6, 8],
		[8, 5],
		[8, 6],
		[8, 8],
	]),
	spriteGraphicSets: [0xa, -1, -1, -1, -1, -1],
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x4,
	emptyBank: 0,

	resource: {
		palettes: [
			[
				32662,
				32767,
				6342,
				17932,
				23185,
				28469,
				32731,
				23247,
				25361,
				28531,
				16736,
				19936,
				24128,
				28352,
				0,
				0,
			],
		],
		tiles: [
			[580, 581, 582, 583],
			[596, 597, 598, 599],
		],
		romOffset: 155048,
	},

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="DirectionalLiftUp-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { DirectionalLiftUp };
