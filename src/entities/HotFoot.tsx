import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

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
				0x18c6,
				0x101a,
				0x10bf,
				0x125f,
				0x25fd,
				0x369e,
				0x475f,
				0x139f,
				0x177,
				0x21c,
				0x29f,
				0x47bf,
				0x137f,
				0x25f,
			],
		],
		tiles: [[131], [146]],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
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
