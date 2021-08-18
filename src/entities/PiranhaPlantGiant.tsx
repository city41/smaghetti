import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

const graphicSetValues = [
	0xb,
	0xc,
	0xd,
	0xe,
	0xf,
	0x10,
	0x11,
	0x12,
	0x13,
	0x14,
	0x15,
	0x16,
	0x17,
	0x18,
	0x19,
	0x1a,
	0x1b,
	0x1c,
	0x1d,
	0x1e,
	0x1f,
];

const PiranhaPlantGiant: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-giant',
		title: 'Piranha Plant - Giant',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [graphicSetValues, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x7d,

	resource: {
		palettes: [
			[
				31744,
				32767,
				6342,
				619,
				6928,
				5044,
				9725,
				13982,
				18271,
				6847,
				28,
				9535,
				17983,
				31441,
				28204,
				22950,
			],
			[
				31744,
				32767,
				6342,
				4122,
				4287,
				4703,
				9725,
				13982,
				18271,
				5023,
				375,
				540,
				671,
				18367,
				4991,
				607,
			],
			[
				31744,
				32767,
				6342,
				12690,
				5686,
				10908,
				500,
				666,
				895,
				17151,
				19026,
				25368,
				30653,
				32763,
				32722,
				29484,
			],
		],
		tiles: [
			[
				{
					tileIndex: 844,
					palette: 1,
				},
				{
					tileIndex: 845,
					palette: 2,
				},
				{
					tileIndex: 844,
					flip: 'h',
					palette: 1,
				},
			],
			[
				860,
				{
					tileIndex: 861,
					palette: 1,
				},
				{
					tileIndex: 860,
					flip: 'h',
				},
			],
			[
				876,
				877,
				{
					tileIndex: 876,
					flip: 'h',
				},
			],
			[
				890,
				893,
				{
					tileIndex: 890,
					flip: 'h',
				},
			],
		],
		romOffset: 1501760,
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '75% 100%' };

		return (
			<div
				className="PiranhaPlantGiant-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 1.5,
			height: TILE_SIZE * 2,
			marginLeft: TILE_SIZE * 0.25,
		};
		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: 0,
			left: -TILE_SIZE * 0.25,
		};

		return (
			<div style={style} className="relative PiranhaPlantGiant-bg bg-cover">
				<TileSpace style={spaceStyle} className="absolute" />
			</div>
		);
	},
};

export { PiranhaPlantGiant };
