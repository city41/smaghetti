import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';
import { parseSimpleSprite } from './util';

const GaloombaWithParachute: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Galoomba - Parachute',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 6],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x15,

	resource: {
		romOffset: 0x18c914,
		palettes: [
			[
				0x7fb4,
				0x7fff,
				0x0,
				0x75ad,
				0x7a94,
				0x7f39,
				0x25de,
				0x273f,
				0x1b1d,
				0x2fbf,
				0x53ff,
				0x119,
				0x167b,
				0x6ab2,
				0x7b98,
				0x7bdd,
			],
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x11dc,
				0x169e,
				0x1b5f,
				0x25fd,
				0x369e,
				0x475f,
				0x111d,
				0x1a1f,
				0x329f,
				0x4b7f,
				0x7bda,
				0x6b55,
				0x56b1,
			],
		],
		tiles: [
			[64, 65],
			[96, 97],
			[
				{ tileIndex: 68, palette: 1 },
				{ tileIndex: 68, flip: 'h', palette: 1 },
			],
			[
				{ tileIndex: 100, palette: 1 },
				{ tileIndex: 100, flip: 'h', palette: 1 },
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
		return (
			<div
				className="GaloombaWithParachute-bg bg-center bg-no-repeat"
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
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
			marginTop: -TILE_SIZE,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: TILE_SIZE,
		};

		return (
			<div style={style} className="relative GaloombaWithParachute-bg bg-cover">
				<TileSpace style={spaceStyle} className="absolute" />
			</div>
		);
	},
};

export { GaloombaWithParachute };
