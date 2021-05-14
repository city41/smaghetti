import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const FullerFlowerBush: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Fuller Flower Bush',
	},

	objectSets: encodeObjectSets([
		[4, 4],
		[12, 4],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	editorType: 'cell',
	dimensions: 'x',
	param1: 'width',
	objectId: 0x4,
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x224,
			0x2aa,
			0x370,
			0x3d4,
			0x1f4,
			0x29a,
			0x37f,
			0x35fd,
			0x467f,
			0x5b1f,
			0x3600,
			0x4aa5,
			0x5b29,
		],

		romOffset: 0x163768,
		tiles: [
			[596, 594],
			[593, 595],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="FullerFlowerBush-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { FullerFlowerBush };
