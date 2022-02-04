import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, parseSimpleObject } from './util';

const MuncherStrip: Entity = {
	dumpedTo32: true,
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Muncher - Strip',
		description:
			'Both Munchers behave the same. This one uses far less space in your level file, but has lower compatibility',
	},

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
	dimensions: 'x',
	objectId: 0x36,
	emptyBank: 1,
	param1: 'ignored',
	param2: 'width',

	toObjectBinary({ x, y, w }) {
		return [0x40, y, x, this.objectId, w];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="Muncher-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { MuncherStrip };
