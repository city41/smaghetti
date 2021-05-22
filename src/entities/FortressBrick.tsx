import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const FortressBrick: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Fortress Brick',
	},

	objectSets: encodeObjectSets([[2, 2]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0xd,
	emptyBank: 1,
	param1: 'height',
	param2: 'width',

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
		romOffset: 0x163768,
		tiles: [
			[
				{
					romOffset: 0x163768,
					tileIndex: 526,
				},
				{
					romOffset: 0x163768,
					tileIndex: 615,
				},
			],
			[
				{
					romOffset: 0x167674,
					tileIndex: 1,
				},
				{ romOffset: 0x167674, tileIndex: 3 },
			],
		],
	},

	toObjectBinary(x, y, w, h): number[] {
		return [getBankParam1(1, h), y, x, this.objectId!, w];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="FortressBrick-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { FortressBrick };
