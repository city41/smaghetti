import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_BELOW_16, ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const FlyingPiranhaPlant: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-piranha',
		title: 'Flying Piranha Plant',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, [3, 4, 5], ANY_BELOW_16],
	objectId: 0xd8,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

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
		romOffset: 0x1724f0,
		tiles: [
			[992, { tileIndex: 992, flip: 'h' }],
			[1008, { tileIndex: 1008, flip: 'h' }],
			[
				{ romOffset: 0x18c914, tileIndex: 111 },
				{ romOffset: 0x18c914, tileIndex: 111, flip: 'h' },
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
			<div
				className="FlyingPiranhaPlant-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 1.5,
			paddingBottom: TILE_SIZE / 2,
			marginLeft: TILE_SIZE / 2,
		};

		return (
			<div
				className="FlyingPiranhaPlant-bg bg-center bg-no-repeat"
				style={style}
			>
				<div className="w-full h-full" style={{ marginLeft: -TILE_SIZE / 2 }}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { FlyingPiranhaPlant };
