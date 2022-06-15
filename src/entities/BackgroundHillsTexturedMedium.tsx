import type { Entity } from './types';
import { encodeObjectSets, parseSimpleObject } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET, OBJECT_PRIORITY_LOWEST } from './constants';
import { TileSpace } from './TileSpace';

const BackgroundHillsTexturedMedium: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Background Hills - Textured, Medium',
	},

	objectSets: encodeObjectSets([
		[3, 3],
		[14, 3],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x2a,
	emptyBank: 0,
	width: 5,
	height: 4,
	objectPriority: OBJECT_PRIORITY_LOWEST,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				548,
				682,
				880,
				980,
				500,
				666,
				895,
				8746,
				12974,
				17201,
				20405,
				479,
				799,
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
					romOffset: 1472116,
					tileIndex: 872,
				},
				{
					romOffset: 1472116,
					tileIndex: 873,
				},
				{
					romOffset: 1472116,
					tileIndex: 874,
				},
				{
					romOffset: 1472116,
					tileIndex: 875,
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
					romOffset: 1472116,
					tileIndex: 876,
				},
				212,
				213,
				{
					romOffset: 1472116,
					tileIndex: 877,
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
					romOffset: 1472116,
					tileIndex: 872,
				},
				{
					romOffset: 1472116,
					tileIndex: 873,
				},
				{
					romOffset: 1472116,
					tileIndex: 890,
				},
				{
					romOffset: 1472116,
					tileIndex: 891,
				},
				197,
				{
					romOffset: 1472116,
					tileIndex: 879,
				},
				{
					romOffset: 1472116,
					tileIndex: 872,
				},
				{
					romOffset: 1472116,
					tileIndex: 873,
				},
				{
					romOffset: 1472116,
					tileIndex: 874,
				},
				{
					romOffset: 1472116,
					tileIndex: 875,
				},
			],
			[
				{
					romOffset: 1472116,
					tileIndex: 876,
				},
				212,
				213,
				{
					romOffset: 1472116,
					tileIndex: 893,
				},
				213,
				214,
				{
					romOffset: 1472116,
					tileIndex: 876,
				},
				212,
				213,
				{
					romOffset: 1472116,
					tileIndex: 877,
				},
			],
			[
				{
					romOffset: 1472116,
					tileIndex: 878,
				},
				196,
				{
					romOffset: 1472116,
					tileIndex: 888,
				},
				{
					romOffset: 1472116,
					tileIndex: 889,
				},
				{
					romOffset: 1472116,
					tileIndex: 890,
				},
				{
					romOffset: 1472116,
					tileIndex: 891,
				},
				197,
				196,
				197,
				{
					romOffset: 1472116,
					tileIndex: 879,
				},
			],
			[
				198,
				212,
				{
					romOffset: 1472116,
					tileIndex: 892,
				},
				212,
				213,
				{
					romOffset: 1472116,
					tileIndex: 893,
				},
				213,
				212,
				213,
				214,
			],
			[
				{
					romOffset: 1472116,
					tileIndex: 878,
				},
				196,
				197,
				196,
				197,
				196,
				197,
				196,
				197,
				{
					romOffset: 1472116,
					tileIndex: 879,
				},
			],
			[198, 212, 213, 212, 213, 212, 213, 212, 213, 214],
		],
		romOffset: 1584308,
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
				className="BackgroundHillsTexturedMedium-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: `100% ${(4 / 5) * 100}%`,
				}}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 5,
			height: TILE_SIZE * 4,
		};

		return (
			<div className="BackgroundHillsTexturedMedium-bg bg-cover" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { BackgroundHillsTexturedMedium };
