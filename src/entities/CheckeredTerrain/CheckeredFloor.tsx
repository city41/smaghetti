import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const CheckeredFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Checkered Floor',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	param1: 'height',
	param2: 'width',
	objectId: 0x2e,
	emptyBank: 1,
	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,

	resource: {
		romOffset: 0x16ad5c,
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x558b,
			0x660f,
			0x7672,
			0x7ef6,
			0x11b3,
			0x2a38,
			0x3abc,
			0x2260,
			0x2ac8,
			0x3b4c,
			0x47b0,
			0x2168,
			0x19f5,
		],
		tiles: [
			[488, 489],
			[478, 479],
		],
	},

	toObjectBinary(x, y, w) {
		// this is totally different from just about all objects
		// in the entire game
		// docs: https://github.com/city41/smaghetti/wiki/Checkered-terrain
		return [0x47, y, x, this.objectId, w + 1];
	},

	simpleRender(size) {
		return (
			<div
				className="CheckeredFloor-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CheckeredFloor };
