import React from 'react';

import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, parseSimpleObject } from './util';

const LineTrackPulley: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Line Track Pulley',
		description:
			'"Powers" the line tracks that platforms ride on, but really is just decoration.',
		warning:
			'Line tracks are not in Smaghetti yet, so this thing is pretty pointless so far ...',
	},

	objectId: 0x7,
	emptyBank: 0,
	objectSets: encodeObjectSets([
		[12, 10],
		[12, 11],
		[12, 12],
		[12, 13],
		[12, 14],
		[12, 1],
		[12, 2],
		[12, 3],
		[12, 4],
		[12, 5],
		[12, 6],
		[12, 8],
		[12, 9],
		[4, 10],
		[4, 11],
		[4, 12],
		[4, 13],
		[4, 14],
		[4, 1],
		[4, 2],
		[4, 3],
		[4, 4],
		[4, 5],
		[4, 6],
		[4, 8],
		[4, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x4dec,
				0x5e50,
				0x6ed3,
				0x7b57,
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
		romOffset: 0x16ea40,
		tiles: [
			[976, 978],
			[977, 979],
		],
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
				className="LineTrackPulley-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { LineTrackPulley };
