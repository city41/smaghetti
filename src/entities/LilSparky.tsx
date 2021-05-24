import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const LilSparky: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Lil Sparky',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xd],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x4d,

	resource: {
		romOffset: 0x18c914,
		palette: [
			0x7fff,
			0x7fff,
			0x0,
			0x5ad6,
			0x739c,
			0x7fff,
			0x26ff,
			0x37f,
			0x5bff,
			0x37f,
			0x4d7f,
			0x0,
			0x0,
			0x0,
			0x0,
			0x0,
		],
		tiles: [
			[468, 469],
			[500, 501],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId!, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="LilSparky-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE);
	},
};

export { LilSparky };
