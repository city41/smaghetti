import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const ParaBomberGoomba: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Goomba - Para Bomber',
		description: 'Flies high and drops mini goombas',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x74,

	resource: {
		romOffset: 0x134104,
		palettes: [
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
			[394, 395],
			[426, 427],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="relative ParaBomberGoomba-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div
					className="ParaWing-bg bg-cover absolute"
					style={{
						width: size / 2,
						height: size,
						right: (-size * 1) / 5,
						top: (-size * 2) / 3,
					}}
				/>
				<div
					className="ParaWing-bg bg-cover absolute"
					style={{
						width: size / 2,
						height: size,
						left: (-size * 1) / 5,
						top: (-size * 2) / 3,
						transform: 'scale(-1, 1)',
					}}
				/>
				<div
					className="PileDriverMiniGoomba-bg bg-cover absolute bg-black"
					style={{
						width: size / 4,
						height: size / 4,
						right: -1,
						bottom: -1,
					}}
				/>
			</div>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { ParaBomberGoomba };
