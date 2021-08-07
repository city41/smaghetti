import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const HorizontalRedPiranhaPlant: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-piranha',
		title: 'Piranha Plant - Horizontal Red',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [[10], -1, -1, graphicSetValues, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xff,
	param1: 'other',

	resource: {
		palettes: [
			[
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
		],
		romOffset: 0x1724f0,
		tiles: [
			[1000, 1001, { romOffset: 0x17a894, tileIndex: 642 }],
			[1016, 1017, { romOffset: 0x17a894, tileIndex: 658 }],
		],
	},

	toSpriteBinary({ x, y }) {
		// fifth byte
		// 0 -- face right
		// 1 -- face left
		return [0, this.objectId, x, y, 1];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 66%' };
		return (
			<div
				className="HorizontalRedPiranhaPlant-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 1.5,
			height: TILE_SIZE,
			backgroundSize: '100%',
			paddingRight: TILE_SIZE / 2,
			marginTop: TILE_SIZE / 2,
			marginLeft: TILE_SIZE * 1.5,
		};

		const spaceStyle = {
			top: -TILE_SIZE / 2,
			left: -TILE_SIZE * 1.5,
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div
				className="relative HorizontalRedPiranhaPlant-bg bg-center bg-no-repeat"
				style={style}
			>
				<TileSpace className="absolute" style={spaceStyle} />
			</div>
		);
	},
};

export { HorizontalRedPiranhaPlant };
