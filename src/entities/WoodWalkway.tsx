import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const WoodWalkway: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Wood Walkway',
	},

	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	editorType: 'cell',
	dimensions: 'x',
	objectId: 0x61,
	emptyBank: 1,
	param1: 'width',

	resource: {
		palette: [
			0x7ffb,
			0x7fff,
			0x0,
			0x575d,
			0x169a,
			0x1237,
			0xdd3,
			0x36b8,
			0x2633,
			0x15b0,
			0x12c,
			0x12c,
			0x3ebf,
			0x2e3d,
			0x19d9,
			0x155,
		],
		romOffset: 0x1cf558,
		tiles: [
			[
				{ romOffset: 0x1cf558, tileIndex: 9 },
				{ romOffset: 0x1cf558, tileIndex: 9, flip: 'h' },
			],
			[17, 18],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="WoodWalkway-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { WoodWalkway };
