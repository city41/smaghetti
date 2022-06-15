import type { Entity } from './types';
import { encodeObjectSets, parseSimpleObject } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET, OBJECT_PRIORITY_LOWEST } from './constants';
import { TileSpace } from './TileSpace';

const BackgroundHillsTexturedSmall: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Background Hills - Textured, Small',
	},

	objectSets: encodeObjectSets([
		[3, 3],
		[14, 3],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x2b,
	emptyBank: 0,
	width: 4,
	height: 3,
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
				872,
				873,
				874,
				875,
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
				876,
				{
					romOffset: 1584308,
					tileIndex: 212,
				},
				{
					romOffset: 1584308,
					tileIndex: 213,
				},
				877,
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
				878,
				{
					romOffset: 1584308,
					tileIndex: 196,
				},
				888,
				889,
				874,
				875,
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
					romOffset: 1584308,
					tileIndex: 198,
				},
				{
					romOffset: 1584308,
					tileIndex: 212,
				},
				892,
				{
					romOffset: 1584308,
					tileIndex: 212,
				},
				{
					romOffset: 1584308,
					tileIndex: 213,
				},
				877,
			],
			[
				872,
				873,
				890,
				891,
				{
					romOffset: 1584308,
					tileIndex: 197,
				},
				{
					romOffset: 1584308,
					tileIndex: 196,
				},
				{
					romOffset: 1584308,
					tileIndex: 197,
				},
				879,
			],
			[
				876,
				{
					romOffset: 1584308,
					tileIndex: 212,
				},
				{
					romOffset: 1584308,
					tileIndex: 213,
				},
				893,
				{
					romOffset: 1584308,
					tileIndex: 213,
				},
				{
					romOffset: 1584308,
					tileIndex: 212,
				},
				{
					romOffset: 1584308,
					tileIndex: 213,
				},
				{
					romOffset: 1584308,
					tileIndex: 214,
				},
			],
		],
		romOffset: 1472116,
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
				className="BackgroundHillsTexturedSmall-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: `100% ${(3 / 4) * 100}%`,
				}}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 4,
			height: TILE_SIZE * 3,
		};

		return (
			<div className="BackgroundHillsTexturedSmall-bg bg-cover" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { BackgroundHillsTexturedSmall };
