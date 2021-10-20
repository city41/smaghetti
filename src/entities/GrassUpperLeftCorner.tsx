import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, parseSimpleObject } from './util';

const GrassUpperLeftCorner: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Grass - Upper Left Corner',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x1,
	emptyBank: 0,
	objectSets: encodeObjectSets([[14, 3]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,

	resource: {
		palettes: [
			[
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
		],
		tiles: [
			[
				{ romOffset: 0x167674, tileIndex: 784 },
				{ romOffset: 0x167674, tileIndex: 783 },
			],
			[
				{ romOffset: 0x167674, tileIndex: 787 },
				{ romOffset: 0x182cb4, tileIndex: 273 },
			],
		],
	},

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="GrassUpperLeftCorner-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { GrassUpperLeftCorner };
