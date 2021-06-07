import React from 'react';
import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const BlueCoin: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Blue Coin',
		description: 'Only appear when a P-Switch is active',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	objectId: 0x22,
	emptyBank: 1,
	param1: 'width',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x39ce,
			0x4a52,
			0x6318,
			0x77bd,
			0x732c,
			0x7fd2,
			0x7ffb,
			0xdf7,
			0x267c,
			0x435f,
			0x5bbf,
			0x0,
			0x0,
		],
		romOffset: 0x176be8,
		tiles: [
			[220, 222],
			[221, 223],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="BlueCoin-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { BlueCoin };
