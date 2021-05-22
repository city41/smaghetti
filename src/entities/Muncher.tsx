import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets } from './util';

const Muncher: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Muncher',
	},

	// TODO: munchers came up in many different sets with
	// different color palettes and such. just chose the biggest one for now
	objectSets: encodeObjectSets([
		[1, 10],
		[1, 11],
		[1, 12],
		[1, 13],
		[1, 14],
		[1, 1],
		[1, 2],
		[1, 3],
		[1, 4],
		[1, 5],
		[1, 6],
		[1, 8],
		[1, 9],
		[11, 10],
		[11, 11],
		[11, 12],
		[11, 13],
		[11, 14],
		[11, 1],
		[11, 2],
		[11, 3],
		[11, 4],
		[11, 5],
		[11, 6],
		[11, 8],
		[11, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x15,

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
		tiles: [
			[
				{ romOffset: 0x176be8, tileIndex: 146 },
				{ romOffset: 0x176be8, tileIndex: 146, flip: 'h' },
			],
			[
				{ romOffset: 0x176be8, tileIndex: 147 },
				{ romOffset: 0x176be8, tileIndex: 147, flip: 'h' },
			],
		],
	},

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		return (
			<div className="Muncher-bg bg-cover" style={{ width: mw, height: mh }} />
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { Muncher };
