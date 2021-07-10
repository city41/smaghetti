import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';

const CheckeredUpperLeftCap: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-checkered',
		title: 'Checkered Cap - Upper Left',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	param1: 'other',
	param2: 'other',
	objectId: 0x2e,
	emptyBank: 1,
	objectSets: encodeObjectSets([
		[1, 12],
		[1, 1],
		[1, 4],
		[1, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x460c,
				0x5a91,
				0x6f35,
				0x7fdb,
				0x11b3,
				0x2a38,
				0x3abc,
				0x2260,
				0x2ac8,
				0x3b4c,
				0x47b0,
				0x2168,
				0x19f5,
			],
		],
		tiles: [
			[
				488,
				{
					romOffset: 1584308,
					tileIndex: 382,
				},
			],
			[478, 491],
		],
		romOffset: 1486172,
	},

	toObjectBinary(x, y) {
		// this is totally different from just about all objects
		// in the entire game
		// docs: https://github.com/city41/smaghetti/wiki/Checkered-terrain
		return [0x4b, y, x, this.objectId, 1];
	},

	simpleRender(size) {
		return (
			<div
				className="CheckeredUpperLeftCap-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CheckeredUpperLeftCap };
