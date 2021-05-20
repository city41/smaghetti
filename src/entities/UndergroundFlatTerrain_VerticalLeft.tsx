import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const UndergroundFlatTerrain_VerticalLeft: Entity = {
	paletteInfo: {
		title: 'Underground Flat Terrain -- Vertical Left',
	},

	editorType: 'cell',
	dimensions: 'y',
	param1: 'height',
	objectId: 0x3a,
	emptyBank: 1,
	// TODO: actually determine all object sets, this is from star02,room0
	objectSets: encodeObjectSets([[0xe, 3]]),
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
				{ romOffset: 0x182cb4, tileIndex: 256 },
				{ romOffset: 0x167674, tileIndex: 788 },
			],
			[
				{ romOffset: 0x182cb4, tileIndex: 272 },
				{ romOffset: 0x167674, tileIndex: 789 },
			],
		],
	},

	toObjectBinary(x, y, _w, h) {
		return [getBankParam1(1, h), y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="UndergroundFlatTerrain_VerticalLeft-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { UndergroundFlatTerrain_VerticalLeft };
