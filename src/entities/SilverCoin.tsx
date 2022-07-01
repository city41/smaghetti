import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { parseSimpleSprite } from './util';

const SilverCoin: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Silver Coin',
		description:
			'Coins generated from Silver P-Switches. Collect 7 or more to gain extra lives.',
		warning: 'These have been known to cause strange bugs. Use with caution.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xc2,

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
		romOffset: 0x189ac0,
		tiles: [
			[24, 25],
			[56, 57],
		],
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
				className="SilverCoin-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { SilverCoin };
