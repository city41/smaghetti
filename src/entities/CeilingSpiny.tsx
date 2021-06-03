import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_OBJECT_SET } from './constants';

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const CeilingSpiny: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Ceiling Spiny',
		description: 'Drops down and attacks when Mario is below',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		-1,
		graphicSets,
		graphicSets,
		graphicSets,
	],
	objectId: 0x69,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palette: [
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
		romOffset: 0x2282e4,
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
				className="Spiny-bg bg-cover"
				style={{ width: size, height: size, transform: 'scale(1, -1)' }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CeilingSpiny };
