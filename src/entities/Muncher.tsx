import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets } from './util';

const Muncher: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
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
		palettes: [
			[
				31744,
				32767,
				0,
				521,
				8846,
				14130,
				18359,
				500,
				666,
				895,
				21,
				3485,
				703,
				13824,
				19109,
				23337,
			],
		],
		tiles: [
			[
				{
					romOffset: 1455976,
					tileIndex: 678,
				},
				250,
			],
			[249, 251],
		],
		romOffset: 1534952,
	},

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
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

export { Muncher };
