import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import React from 'react';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// TODO: 0x80 is a green para troop that flies back and forth
const GreenParaTroopa: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Green Para Troopa',
	},

	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, -1],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6e,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x26b,
			0x1b10,
			0x13b4,
			0x25fd,
			0x369e,
			0x475f,
			0x1abf,
			0x1c,
			0x253f,
			0x463f,
			0x7ad1,
			0x6e2c,
			0x59a6,
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
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
			backgroundSize: '50% 100%',
		};

		return (
			<div
				className="GreenParaTroopa-bg bg-center bg-no-repeat"
				style={style}
			/>
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
			<div className="GreenParaTroopa-bg bg-cover bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { GreenParaTroopa };
