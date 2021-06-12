import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const UpFortressSpike: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Fortress Spike',
		description: 'Pointing up',
	},

	objectSets: encodeObjectSets([[2, 2]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'width',
	objectId: 0xb,
	emptyBank: 1,

	resource: {
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
		romOffset: 0x167674,
		tiles: [
			[76, 76],
			[74, 74],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="UpFortressSpike-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { UpFortressSpike };
