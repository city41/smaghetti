import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

/**
 * if the player stands on top of these, they fall,
 * but when they fall, a bogus tile is shown. need to figure
 * out the correct object set for these before adding to palette
 */
const LargeSpike: Entity = {
	// paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Large Spike',
	},

	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	editorType: 'cell',
	dimensions: 'x',
	objectId: 0x5d,
	emptyBank: 1,
	param1: 'width',

	resource: {
		palette: [
			0x23df,
			0x7fff,
			0x0,
			0x4e71,
			0x5ef5,
			0x6f79,
			0x7bdd,
			0x13,
			0x19,
			0x1f,
			0x112,
			0x5a1f,
			0x6ebf,
			0x7f9f,
			0x579f,
			0x6fff,
		],
		romOffset: 0x20e4f0,
		tiles: [
			[64, 65],
			[80, 81],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="LargeSpike-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { LargeSpike };
