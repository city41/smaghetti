import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const Galoomba: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Galoomba',
		description: 'The Goombas of SMW',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 6],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x17,

	resource: {
		romOffset: 0x134104,
		palettes: [
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
			[30, 31],
			[62, 63],
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
				className="Galoomba-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Galoomba };
