import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const CheckeredCeiling: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-checkered',
		title: 'Checkered Ceiling',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'other',
	param2: 'width',
	objectId: 0x2e,
	emptyBank: 1,
	objectSets: encodeObjectSets(objectSets),
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
					romOffset: 1253344,
					tileIndex: 262,
				},
				477,
			],
			[486, 487],
		],
		romOffset: 1486172,
	},

	toObjectBinary(x, y, w) {
		// this is totally different from just about all objects
		// in the entire game
		// docs: https://github.com/city41/smaghetti/wiki/Checkered-terrain
		return [0x42, y, x, this.objectId, w + 1];
	},

	simpleRender(size) {
		return (
			<div
				className="CheckeredCeiling-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CheckeredCeiling };
