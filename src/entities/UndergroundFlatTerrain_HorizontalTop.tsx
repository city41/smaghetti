import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const UndergroundFlatTerrain_HorizontalTop: Entity = {
	paletteInfo: {
		title: 'Underground Flat Terrain -- Horizontal Top',
	},

	editorType: 'cell',
	dimensions: 'x',
	param2: 'width',
	objectId: 0x43,
	emptyBank: 1,
	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x22d,
			0x1271,
			0x26f5,
			0x3779,
			0x6623,
			0x7b2e,
			0x7fd6,
			0x1132,
			0x1996,
			0x263b,
			0x2e9e,
			0x0,
			0x0,
		],
		tiles: [
			[
				{ romOffset: 0x167674, tileIndex: 782 },
				{ romOffset: 0x167674, tileIndex: 783 },
			],
			[
				{ romOffset: 0x182cb4, tileIndex: 272 },
				{ romOffset: 0x182cb4, tileIndex: 273 },
			],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, 0), y, x, this.objectId!, w];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="UndergroundFlatTerrain_HorizontalTop-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { UndergroundFlatTerrain_HorizontalTop };
