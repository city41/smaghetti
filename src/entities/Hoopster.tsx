import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const Hoopster: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Hoopster',
		description: 'Needs a vine to crawl on',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, [5, 4], -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xeb,

	resource: {
		romOffset: 0x18fa98,
		palette: [
			0x4d7f,
			0x7fff,
			0x2108,
			0x61af,
			0x7633,
			0x7ed8,
			0x101a,
			0x10bf,
			0x129f,
			0x27bf,
			0x15d8,
			0x2a7d,
			0x3f1f,
			0x0,
			0x0,
			0x0,
		],
		tiles: [
			[90, 91],
			[122, 123],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="Hoopster-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE);
	},
};

export { Hoopster };
