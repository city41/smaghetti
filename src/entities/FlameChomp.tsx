import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';

const FlameChomp: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'FlameChomp',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [5, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x58,

	resource: {
		romOffset: 0x163768,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x39ce,
				0x4a52,
				0x5ef7,
				0x7a8b,
				0x7f6e,
				0x7fd6,
				0x6f7b,
				0x19f8,
				0x2e5c,
				0x42ff,
				0x1b1f,
				0x1a1f,
				0x1d,
			],
		],
		tiles: [
			[902, 903],
			[918, 919],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="FlameChomp-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { FlameChomp };
