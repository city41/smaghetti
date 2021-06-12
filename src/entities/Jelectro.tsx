import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const Jelectro: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-water',
		title: 'Jelectro',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0x10],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xef,

	resource: {
		romOffset: 0x18c914,
		palettes: [
			[
				0x7fd8,
				0x7fff,
				0x0,
				0x75ad,
				0x7a94,
				0x7f39,
				0x25de,
				0x273f,
				0x79eb,
				0x7e70,
				0x7f14,
				0x7fb9,
				0x0,
				0x0,
				0x0,
				0x0,
			],
		],
		tiles: [
			[708, 709],
			[740, 741],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="Jelectro-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Jelectro };
