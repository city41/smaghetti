import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const TerracottaBrick: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Terracotta Brick',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x5f,
	param1: 'width',
	param2: 'height',
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7ffb,
				0x7fff,
				0x0,
				0x575d,
				0x169a,
				0x1237,
				0xdd3,
				0x36b8,
				0x2633,
				0x15b0,
				0x12c,
				0x12c,
				0x3ebf,
				0x2e3d,
				0x19d9,
				0x155,
			],
		],
		romOffset: 0x1cf558,
		tiles: [
			[5, 6],
			[21, 22],
		],
	},

	toObjectBinary({ x, y, w, h }) {
		return [getBankParam1(1, w), y, x, this.objectId, h];
	},

	simpleRender(size) {
		return (
			<div
				className="TerracottaBrick-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { TerracottaBrick };
