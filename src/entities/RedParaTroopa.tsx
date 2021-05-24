import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import React from 'react';
import { ANY_BELOW_16, ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const RedParaTroopa: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Red Para Troopa',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6f,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x101a,
			0x10bf,
			0x125f,
			0x25fd,
			0x369e,
			0x475f,
			0x139f,
			0x177,
			0x21c,
			0x29f,
			0x47bf,
			0x137f,
			0x25f,
		],
		tiles: [
			[
				{ romOffset: 0x2282e4, tileIndex: 322 },
				{ romOffset: 0x1724f0, tileIndex: 967 },
			],
			[
				{ romOffset: 0x2282e4, tileIndex: 354 },
				{ romOffset: 0x1724f0, tileIndex: 983 },
			],
			[
				{ romOffset: 0x2282e4, tileIndex: 386 },
				{ romOffset: 0x2282e4, tileIndex: 387 },
			],
			[
				{ romOffset: 0x2282e4, tileIndex: 418 },
				{ romOffset: 0x2282e4, tileIndex: 419 },
			],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId!, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 100%',
		};

		return (
			<div className="RedParaTroopa-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
			marginTop: -TILE_SIZE,
			paddingTop: TILE_SIZE,
			backgroundPositionY: 2,
		};

		return (
			<div className="RedParaTroopa-bg bg-cover bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { RedParaTroopa };
