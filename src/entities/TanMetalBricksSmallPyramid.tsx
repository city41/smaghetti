import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const TanMetalBricksSmallPyramid: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-large',
		title: 'Tan Metal Brick - Pyramid',
	},

	objectSets: encodeObjectSets([[9, 9]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x1,
	emptyBank: 0,
	width: 12,
	height: 6,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				14798,
				19026,
				25368,
				30653,
				29484,
				32722,
				32763,
				4498,
				6711,
				9916,
				13182,
				0,
				0,
			],
			[
				31744,
				0,
				32767,
				24035,
				31400,
				5278,
				607,
				9055,
				8973,
				0,
				0,
				0,
				25535,
				0,
				0,
				0,
			],
		],
		tiles: [
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				16,
				14,
				14,
				14,
				14,
				14,
				14,
				17,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				22,
				12,
				12,
				12,
				12,
				12,
				12,
				23,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				16,
				14,
				14,
				14,
				14,
				14,
				14,
				17,
				16,
				14,
				14,
				14,
				14,
				14,
				14,
				17,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				22,
				12,
				12,
				12,
				12,
				12,
				12,
				23,
				22,
				12,
				12,
				12,
				12,
				12,
				12,
				23,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
			[
				16,
				14,
				14,
				14,
				14,
				14,
				14,
				17,
				16,
				14,
				14,
				14,
				14,
				14,
				14,
				17,
				16,
				14,
				14,
				14,
				14,
				14,
				14,
				17,
			],
			[
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
			],
			[
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
				18,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				21,
			],
			[
				22,
				12,
				12,
				12,
				12,
				12,
				12,
				23,
				22,
				12,
				12,
				12,
				12,
				12,
				12,
				23,
				22,
				12,
				12,
				12,
				12,
				12,
				12,
				23,
			],
		],
		romOffset: 0x16ea40,
	},

	toObjectBinary(x, y) {
		return [0, y, x + 4, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="TanMetalBricksSmallTrio-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: '100% 50%',
				}}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 12,
			height: TILE_SIZE * 6,
		};

		return (
			<div className="TanMetalBricksSmallTrio-bg bg-cover" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { TanMetalBricksSmallPyramid as TanMetalBricksSmallTrio };
