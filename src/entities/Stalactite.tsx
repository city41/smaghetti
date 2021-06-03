import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, getBankParam1 } from './util';

const Stalactite: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Stalactite',
	},

	// TODO: many more object sets are valid, mostly alternate colors
	objectSets: encodeObjectSets([
		[14, 0],
		[14, 10],
		[14, 11],
		[14, 12],
		[14, 13],
		[14, 14],
		[14, 15],
		[14, 1],
		[14, 2],
		[14, 3],
		[14, 4],
		[14, 5],
		[14, 6],
		[14, 8],
		[14, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0x5e,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x520c,
			0x6270,
			0x72f3,
			0x7b77,
			0x1f4,
			0x29a,
			0x37f,
			0x7e93,
			0x7f17,
			0x7fbc,
			0x7ffe,
			0x1df,
			0x31f,
		],
		romOffset: 0x16ea40,
		tiles: [
			[122, 122],
			[123, 123],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="Stalactite-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Stalactite };
