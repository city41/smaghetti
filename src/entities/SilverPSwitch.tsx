import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { parseSimpleSprite } from './util';

const SilverPSwitch: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Silver P-Switch',
		description: 'Turns all enemies into silver coins for massive 1ups',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xc1,

	resource: {
		palettes: [
			[
				0x7ffb,
				0x7fff,
				0x0,
				0x579f,
				0x6fff,
				0x6b5a,
				0x4631,
				0x5ad6,
				0x77bd,
				0x112,
				0x5a1f,
				0x6ebf,
				0x7f9f,
				0x465f,
				0x1f,
				0x19,
			],
		],
		romOffset: 0x18af80,
		tiles: [
			[4, 5],
			[36, 37],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this.objectId, 'SilverPSwitch');
	},

	simpleRender(size) {
		return (
			<div
				className="SilverPSwitch-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { SilverPSwitch };
