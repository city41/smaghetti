import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { encodeObjectSets } from '../util';
import { objectSets } from './objectSets';

const PSwitch: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'P-Switch',
		description: 'Coins to bricks, bricks to coins, and other secrets...',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x28,
	emptyBank: 0,

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
				0xd1,
				0x175,
				0x23b,
				0x2be,
				0x223f,
				0x371f,
			],
		],
		romOffset: 0x16ea40,
		tiles: [
			[992, 994],
			[993, 995],
		],
	},

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="PSwitch-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { PSwitch };
