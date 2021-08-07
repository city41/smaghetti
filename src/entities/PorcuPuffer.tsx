import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

const PorcuPuffer: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-water',
		title: 'Porcu-Puffer',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xa],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xd5,

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
		],
		tiles: [
			[264, 265, 266, 267],
			[296, 297, 298, 299],
			[328, 329, 330, 331],
			[360, 361, 362, 363],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="PorcuPuffer-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = {
			marginTop: -TILE_SIZE / 2,
			marginLeft: -TILE_SIZE / 2,
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: TILE_SIZE / 2,
			left: TILE_SIZE / 2,
		};

		return (
			<div className="relative PorcuPuffer-bg" style={style}>
				<div className="absolute" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { PorcuPuffer };
