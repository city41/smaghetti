import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import React from 'react';
import { ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const ShoeGoomba: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Shoe Goomba',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, -1],
	objectId: 0x2b,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

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
				{ romOffset: 0x134104, tileIndex: 394 },
				{ romOffset: 0x134104, tileIndex: 395 },
			],
			[
				{ romOffset: 0x163768, tileIndex: 740 },
				{ romOffset: 0x163768, tileIndex: 742 },
			],
			[
				{ romOffset: 0x163768, tileIndex: 756 },
				{ romOffset: 0x163768, tileIndex: 757 },
			],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '66% 100%',
		};

		return (
			<div className="ShoeGoomba-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 1,
			height: TILE_SIZE * 1.5,
			marginTop: -TILE_SIZE / 2,
			paddingTop: TILE_SIZE / 2,
			// backgroundPositionY: 2,
		};

		return (
			<div className="ShoeGoomba-bg bg-cover bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { ShoeGoomba };
