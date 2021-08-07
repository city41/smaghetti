import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';

const CheckeredPlatformLeftCap: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-checkered',
		title: 'Checkered Platform - Left Cap',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	param1: 'other',
	param2: 'width',
	objectId: 0x4f,
	emptyBank: 1,
	objectSets: encodeObjectSets([
		[1, 12],
		[1, 1],
		[1, 4],
		[1, 9],
		[11, 12],
		[11, 1],
		[11, 4],
		[11, 9],
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
				{
					romOffset: 1584308,
					tileIndex: 383,
				},
				489,
			],
			[
				{
					romOffset: 1584308,
					tileIndex: 367,
				},
				487,
			],
		],
		romOffset: 1486172,
	},

	toObjectBinary({ x, y }) {
		// this is totally different from just about all objects
		// in the entire game
		// docs: https://github.com/city41/smaghetti/wiki/Checkered-terrain
		return [8, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="CheckeredPlatformLeftCap-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CheckeredPlatformLeftCap };
