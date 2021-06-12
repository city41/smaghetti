import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';

const Blooper: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-water',
		title: 'Blooper',
		description: 'behaves best in water',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [7, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x62,

	resource: {
		romOffset: 0x167674,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x26b,
				0x1b10,
				0x13b4,
				0x25fd,
				0x369e,
				0x475f,
				0x1abf,
				0x1c,
				0x253f,
				0x463f,
				0x7ad1,
				0x6e2c,
				0x59a6,
			],
		],
		tiles: [
			[680, { tileIndex: 680, flip: 'h' }],
			[696, { tileIndex: 696, flip: 'h' }],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="Blooper-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Blooper };
