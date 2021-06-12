import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

/**
 * if the player stands on top of these, they fall,
 */
const FallAwaySpike: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Fall Away Spike',
		description: 'Deadly from below, but also fall if you stand on top of them',
	},

	objectSets: encodeObjectSets(objectSets),
	// TODO: this is not true, when the spikes fall away they become sprites
	// which have finite graphic sets
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	objectId: 0x5d,
	emptyBank: 1,
	param1: 'width',

	resource: {
		palettes: [
			[
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
		],
		romOffset: 0x20e4f0,
		tiles: [
			[64, 65],
			[80, 81],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="FallAwaySpike-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { FallAwaySpike };
