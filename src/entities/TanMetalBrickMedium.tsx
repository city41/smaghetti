import type { Entity } from './types';
import { encodeObjectSets, parseSimpleObject } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const TanMetalBrickMedium: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-desert',
		title: 'Tan Metal Brick - Medium',
	},

	objectSets: encodeObjectSets([[9, 9]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x42,
	emptyBank: 0,
	width: 6,
	height: 3,
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
		],
		tiles: [
			[
				{
					romOffset: 1501760,
					tileIndex: 16,
				},
				{
					romOffset: 1501760,
					tileIndex: 14,
				},
				{
					romOffset: 1501760,
					tileIndex: 14,
				},
				{
					romOffset: 1501760,
					tileIndex: 14,
				},
				{
					romOffset: 1501760,
					tileIndex: 14,
				},
				{
					romOffset: 1501760,
					tileIndex: 14,
				},
				{
					romOffset: 1501760,
					tileIndex: 14,
				},
				{
					romOffset: 1501760,
					tileIndex: 14,
				},
				{
					romOffset: 1501760,
					tileIndex: 14,
				},
				{
					romOffset: 1501760,
					tileIndex: 14,
				},
				{
					romOffset: 1501760,
					tileIndex: 14,
				},
				{
					romOffset: 1501760,
					tileIndex: 17,
				},
			],
			[
				{
					romOffset: 1501760,
					tileIndex: 18,
				},
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				{
					romOffset: 1501760,
					tileIndex: 21,
				},
			],
			[
				{
					romOffset: 1501760,
					tileIndex: 18,
				},
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				{
					romOffset: 1501760,
					tileIndex: 21,
				},
			],
			[
				{
					romOffset: 1501760,
					tileIndex: 18,
				},
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				{
					romOffset: 1501760,
					tileIndex: 21,
				},
			],
			[
				{
					romOffset: 1501760,
					tileIndex: 18,
				},
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				510,
				{
					romOffset: 1501760,
					tileIndex: 21,
				},
			],
			[
				{
					romOffset: 1501760,
					tileIndex: 22,
				},
				{
					romOffset: 1501760,
					tileIndex: 12,
				},
				{
					romOffset: 1501760,
					tileIndex: 12,
				},
				{
					romOffset: 1501760,
					tileIndex: 12,
				},
				{
					romOffset: 1501760,
					tileIndex: 12,
				},
				{
					romOffset: 1501760,
					tileIndex: 12,
				},
				{
					romOffset: 1501760,
					tileIndex: 12,
				},
				{
					romOffset: 1501760,
					tileIndex: 12,
				},
				{
					romOffset: 1501760,
					tileIndex: 12,
				},
				{
					romOffset: 1501760,
					tileIndex: 12,
				},
				{
					romOffset: 1501760,
					tileIndex: 12,
				},
				{
					romOffset: 1501760,
					tileIndex: 23,
				},
			],
		],
		romOffset: 1486172,
	},

	toObjectBinary({ x, y }) {
		return [0x40, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0x40, this);
	},

	simpleRender(size) {
		return (
			<div
				className="relative TanMetalBrickMedium-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: '100% 50%',
				}}
			>
				<div className="absolute bottom-0 left-0 w-full text-center bg-black text-white text-xs">
					medium
				</div>
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 6,
			height: TILE_SIZE * 3,
		};

		return <div className="TanMetalBrickMedium-bg bg-cover" style={style} />;
	},
};

export { TanMetalBrickMedium };
