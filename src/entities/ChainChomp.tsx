import React from 'react';
import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';

const ChainChomp: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Chain Chomp',
	},
	spriteGraphicSets: [[2, 3], -1, -1, -1, -1, -1],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x89,

	resource: {
		romOffset: 0x163768,
		palette: [
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
		tiles: [
			[194, 195],
			[210, 211],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="ChainChomp-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { ChainChomp };
