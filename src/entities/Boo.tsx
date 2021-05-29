import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_BELOW_16, ANY_OBJECT_SET } from './constants';

const Boo: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Boo',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [[6, 8], -1, -1, -1, -1, ANY_BELOW_16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x2f,

	resource: {
		romOffset: 0x167674,
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
			[164, 165],
			[180, 181],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div className="Boo-bg bg-cover" style={{ width: size, height: size }} />
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Boo };
