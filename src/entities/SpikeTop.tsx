import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const SpikeTop: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Spike Top',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xe],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xd6,

	resource: {
		romOffset: 0x18c914,
		palettes: [
			[
				0x2171,
				0x7fff,
				0x0,
				0x26e9,
				0x27c9,
				0x27e9,
				0x25db,
				0x273f,
				0x475f,
				0x14b6,
				0x253d,
				0x3dff,
				0x3fdf,
			],
		],
		tiles: [
			[512, 513],
			[544, 545],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="SpikeTop-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { SpikeTop };
