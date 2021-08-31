import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';
import { parseSimpleSprite } from './util';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const PtooiePottedPiranhaPlant: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-piranha',
		title: 'Ptooie Potted Piranha Plant',
		description: 'Normally potted in a pipe, but can work on ground too.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [3, 0, 0, graphicSetValues, 0, 0],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x46,

	resource: {
		romOffset: 0x163768,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x11f1,
				0x1a75,
				0x22f9,
				0x318c,
				0x4631,
				0x56b5,
				0x2b5c,
				0xda,
				0x219e,
				0x363f,
				0x7eb7,
				0x6e11,
				0x596d,
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
		],
		tiles: [
			[653, { tileIndex: 653, flip: 'h' }],
			[
				{ tileIndex: 653, flip: 'v' },
				{ tileIndex: 653, flip: 'hv' },
			],
			[517, 517],
			[
				{ romOffset: 0x1724f0, tileIndex: 992, palette: 1 },
				{ romOffset: 0x1724f0, tileIndex: 992, flip: 'h', palette: 1 },
			],
			[
				{ romOffset: 0x1724f0, tileIndex: 1008, palette: 1 },
				{ romOffset: 0x1724f0, tileIndex: 1008, flip: 'h', palette: 1 },
			],
			[
				{ romOffset: 0x1724f0, tileIndex: 993, palette: 2 },
				{ romOffset: 0x1724f0, tileIndex: 993, flip: 'h', palette: 2 },
			],
			[
				{ romOffset: 0x1724f0, tileIndex: 993, palette: 2 },
				{ romOffset: 0x1724f0, tileIndex: 993, flip: 'h', palette: 2 },
			],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(
			data,
			offset,
			0,
			this.objectId,
			'PtooiePottedPiranhaPlant'
		);
	},

	simpleRender(size) {
		return (
			<div
				className="PtooiePottedPiranhaPlant-bg bg-center bg-no-repeat"
				style={{ width: size, height: size, backgroundSize: '28.5% 100%' }}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 3.5,
			marginTop: -TILE_SIZE * 1.5,
			marginLeft: TILE_SIZE / 2,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: TILE_SIZE * 1.5,
			left: -TILE_SIZE / 2,
		};

		return (
			<div
				className="relative PtooiePottedPiranhaPlant-bg bg-cover"
				style={style}
			>
				<div className="absolute left-0" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { PtooiePottedPiranhaPlant };
