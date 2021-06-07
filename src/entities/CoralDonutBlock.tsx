import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const CoralDonutBlock: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Coral Donut Block',
	},

	objectSets: encodeObjectSets([
		[6, 5],
		[6, 6],
		[6, 8],
		[8, 5],
		[8, 6],
		[8, 8],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'y',
	param1: 'height',
	objectId: 0xd,
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x15d2,
			0x2257,
			0x2afc,
			0x37be,
			0x195d,
			0x39df,
			0x52bf,
			0x3192,
			0x1636,
			0x2a9c,
			0x42ff,
			0x0,
			0x0,
		],
		romOffset: 0x17a894,
		tiles: [
			[628, 630],
			[629, 631],
		],
	},

	toObjectBinary(x, y, _w, h) {
		return [getBankParam1(1, h), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="CoralDonutBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CoralDonutBlock };
