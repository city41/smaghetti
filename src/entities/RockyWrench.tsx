import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';

const RockyWrench: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-airship',
		title: 'Rocky Wrench',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, 0, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xad,

	resource: {
		romOffset: 0x163768,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x11f1,
				0x1a75,
				0x22f9,
				0x318c,
				0x4631,
				0x56b5,
				0x2b5c,
				0xda,
				0x219e,
				0x363f,
				0x7eb7,
				0x6e11,
				0x596d,
			],
		],
		tiles: [
			[32, 33],
			[48, 49],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="RockyWrench-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { RockyWrench };
