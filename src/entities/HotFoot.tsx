import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const HotFoot: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Hot Foot',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [6, -1, -1, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x45,

	resource: {
		romOffset: 0x167674,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x65a3,
				0x7a8b,
				0x7f6e,
				0x7fd6,
				0x1594,
				0x2e39,
				0x42bd,
				0x11,
				0x16,
				0x1a,
				0xdbe,
				0x123f,
				0x2bf,
			],
		],
		tiles: [[131], [146]],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="HotFoot-bg bg-center bg-no-repeat"
				style={{ width: size, height: size, backgroundSize: '50% 100%' }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { HotFoot };
