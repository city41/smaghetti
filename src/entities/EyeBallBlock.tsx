import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const EyeBallBlock: Entity = {
	paletteInfo: {
		title: 'Eye Ball Block',
		description: 'Why is this eyeball in the game? Anyone know?',
	},

	objectSets: encodeObjectSets([
		[14, 10],
		[3, 10],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x28,
	emptyBank: 1,
	param1: 'height',
	param2: 'width',

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x22d,
				0x1271,
				0x26f5,
				0x3779,
				0x6623,
				0x7b2e,
				0x7fd6,
				0x1132,
				0x1996,
				0x263b,
				0x2e9e,
				0x0,
				0x0,
			],
		],
		tiles: [
			[352, 354],
			[353, 355],
		],
		romOffset: 0x16ea40,
	},

	toObjectBinary({ x, y, w, h }) {
		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	simpleRender(size) {
		return (
			<div
				className="EyeBallBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { EyeBallBlock };
