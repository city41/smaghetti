import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { TileSpace } from '../TileSpace';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { encodeObjectSets } from '../util';
import { objectSets } from './objectSets';

const SpikeBall: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Spike Ball',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x4d,
	emptyBank: 0,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				26019,
				31371,
				32622,
				32726,
				5524,
				11833,
				17085,
				8800,
				10952,
				15180,
				18352,
				8767,
				22515,
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
			[
				31744,
				32767,
				0,
				20081,
				24309,
				28537,
				31709,
				19,
				25,
				31,
				274,
				23071,
				28351,
				32671,
				22431,
				28671,
			],
		],
		tiles: [
			[
				{
					romOffset: 1516784,
					tileIndex: 87,
					palette: 1,
				},
				453,
				454,
				{
					romOffset: 1472116,
					tileIndex: 197,
				},
			],
			[
				484,
				{
					romOffset: 2155760,
					tileIndex: 83,
					palette: 2,
				},
				{
					romOffset: 2155760,
					tileIndex: 83,
					flip: 'h',
					palette: 2,
				},
				487,
			],
			[
				{
					tileIndex: 487,
					flip: 'hv',
				},
				{
					romOffset: 2155760,
					tileIndex: 15,
					palette: 2,
				},
				{
					romOffset: 2155760,
					tileIndex: 15,
					flip: 'h',
					palette: 2,
				},
				{
					tileIndex: 484,
					flip: 'hv',
				},
			],
			[
				{
					romOffset: 1261828,
					tileIndex: 32,
					palette: 1,
				},
				{
					tileIndex: 454,
					flip: 'hv',
				},
				{
					tileIndex: 453,
					flip: 'hv',
				},
				{
					tileIndex: 167,
					palette: 1,
				},
			],
		],
		romOffset: 1617792,
	},

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="SpikeBall-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
		};

		return (
			<div className="SpikeBall-bg bg-cover" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { SpikeBall };
