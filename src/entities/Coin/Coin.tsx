import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const Coin: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Coin',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x16,
	emptyBank: 1,
	param1: 'width',
	param2: 'height',

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x209,
				0x228e,
				0x3732,
				0x47b7,
				0x1f4,
				0x29a,
				0x37f,
				0x15,
				0xd9d,
				0x2bf,
				0x3600,
				0x4aa5,
				0x5b29,
			],
		],
		romOffset: 0x176be8,
		tiles: [
			[220, 222],
			[221, 223],
		],
	},

	toObjectBinary({ x, y, w, h }) {
		return [getBankParam1(1, w), y, x, this.objectId, h];
	},

	simpleRender(size) {
		return (
			<div className="Coin-bg bg-cover" style={{ width: size, height: size }} />
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Coin };
