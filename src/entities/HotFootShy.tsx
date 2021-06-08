import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const HotFootShy: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Hot Foot - Shy',
		description:
			"Like regular Hot Foot, but won't pursue if Mario is looking (similar to Boos)",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [6, -1, -1, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x30,

	resource: {
		romOffset: 0x167674,
		palette: [
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
		tiles: [[131], [146]],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="HotFootShy-bg bg-center bg-no-repeat"
				style={{ width: size, height: size, backgroundSize: '50% 100%' }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { HotFootShy };
