import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const IndestructibleBrick: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Indestructible Brick',
		description: 'Kinda looks like chocolate',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	param1: 'height',
	param2: 'width',
	objectId: 0x80,
	emptyBank: 1,

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
		romOffset: 0x20e4f0,
		tiles: [
			[78, 79],
			[94, 95],
		],
	},

	toObjectBinary(x, y, w, h) {
		return [getBankParam1(1, h), y, x, this.objectId!, w];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="IndestructibleBrick-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { IndestructibleBrick };
