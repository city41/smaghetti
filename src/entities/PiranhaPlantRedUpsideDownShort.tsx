import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const graphicSetValues = [
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	0xa,
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

const PiranhaPlantRedUpsideDownShort: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-piranha',
		title: 'Piranha Plant - Upside Down Red, Short',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xa1,
	param1: 'other',

	resource: {
		romOffset: 0x1724f0,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x26b,
				0x1b10,
				0x13b4,
				0x25fd,
				0x369e,
				0x475f,
				0x1abf,
				0x1c,
				0x253f,
				0x463f,
				0x7ad1,
				0x6e2c,
				0x59a6,
			],
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
		tiles: [
			[
				{ tileIndex: 993, flip: 'v' },
				{ tileIndex: 993, flip: 'hv' },
			],
			[
				{ tileIndex: 993, flip: 'v' },
				{ tileIndex: 993, flip: 'hv' },
			],
			[
				{ tileIndex: 1008, flip: 'v', palette: 1 },
				{ tileIndex: 1008, flip: 'hv', palette: 1 },
			],
			[
				{ tileIndex: 992, flip: 'v', palette: 1 },
				{ tileIndex: 992, flip: 'hv', palette: 1 },
			],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 100%',
			backgroundPosition: `center -${size / 4}px`,
		};
		return (
			<div
				className="PiranhaPlantRedUpsideDownShort-bg bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2.5,
			marginLeft: TILE_SIZE / 2,
			backgroundSize: '100%',
			backgroundPositionY: TILE_SIZE * 0.5,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: 0,
			left: -TILE_SIZE / 2,
		};

		return (
			<div
				className="relative PiranhaPlantRedUpsideDownShort-bg bg-no-repeat"
				style={style}
			>
				<TileSpace className="absolute" style={spaceStyle} />
			</div>
		);
	},
};

export { PiranhaPlantRedUpsideDownShort };
