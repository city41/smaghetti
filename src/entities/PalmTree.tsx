import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const PalmTree: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Palm Tree',
	},

	objectSets: encodeObjectSets([[9, 9]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x44,
	emptyBank: 0,
	width: 2,
	height: 4,

	resource: {
		palettes: [
			[
				32767,
				32767,
				0,
				413,
				4638,
				9887,
				14111,
				500,
				666,
				895,
				582,
				4844,
				10129,
				14292,
				479,
				799,
			],
			[
				32767,
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
			[107, 108, 109, 110],
			[111, 112, 113, 114],
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				115,
				116,
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
				115,
				116,
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
				115,
				116,
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
				115,
				116,
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
				115,
				116,
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
				115,
				116,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
		],
		romOffset: 1501760,
	},

	toObjectBinary({ x, y }) {
		return [0x40, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="PalmTree-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: '50% 100%',
				}}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 3,
			height: TILE_SIZE * 4,
			backgroundSize: '66% 100%',
		};

		return (
			<div className="PalmTree-bg bg-center bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { PalmTree };
