import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const BackgroundHillsStripedLarge: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Background Hills - Striped, Large',
	},

	objectSets: encodeObjectSets([[1, 1]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x2,
	emptyBank: 0,
	width: 6,
	height: 8,

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
				616,
				617,
				618,
				619,
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
				620,
				584,
				578,
				621,
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
				586,
				584,
				538,
				539,
				618,
				619,
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
				586,
				584,
				542,
				584,
				578,
				621,
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
				586,
				584,
				590,
				584,
				589,
				587,
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
				586,
				584,
				590,
				584,
				589,
				587,
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
				616,
				617,
				540,
				541,
				590,
				584,
				589,
				587,
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
				620,
				584,
				578,
				543,
				590,
				584,
				589,
				587,
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
				616,
				617,
				540,
				541,
				589,
				591,
				590,
				584,
				589,
				587,
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
				620,
				584,
				578,
				543,
				589,
				591,
				590,
				584,
				589,
				587,
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
				586,
				584,
				589,
				591,
				589,
				591,
				590,
				584,
				589,
				587,
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
				586,
				584,
				589,
				591,
				589,
				591,
				590,
				584,
				589,
				587,
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
			[586, 584, 589, 591, 589, 591, 590, 584, 538, 539, 618, 619],
			[586, 584, 589, 591, 589, 591, 590, 584, 542, 584, 578, 621],
			[586, 584, 589, 591, 589, 591, 590, 584, 590, 584, 589, 587],
			[586, 584, 589, 591, 589, 591, 590, 584, 590, 584, 589, 587],
		],
		romOffset: 1455976,
	},

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="BackgroundHillsStripedLarge-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: '75% 100%',
				}}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 6,
			height: TILE_SIZE * 8,
		};

		return (
			<div className="BackgroundHillsStripedLarge-bg bg-cover" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { BackgroundHillsStripedLarge };
