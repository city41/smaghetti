import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';

const CheckeredBlock: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-checkered',
		title: 'Checkered Block',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	param1: 'other',
	param2: 'width',
	objectId: 0x4f,
	emptyBank: 1,
	objectSets: encodeObjectSets([
		[1, 12],
		[1, 1],
		[1, 4],
		[1, 9],
		[11, 12],
		[11, 1],
		[11, 4],
		[11, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,

	resource: {
		palettes: [
			[
				32662,
				32767,
				0,
				17932,
				23185,
				28469,
				32731,
				4531,
				10808,
				15036,
				8800,
				10952,
				15180,
				18352,
				8552,
				6645,
			],
		],
		tiles: [
			[383, 382],
			[367, 366],
		],
		romOffset: 1584308,
	},

	toObjectBinary({ x, y }) {
		// this is totally different from just about all objects
		// in the entire game
		// docs: https://github.com/city41/smaghetti/wiki/Checkered-terrain
		return [7, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="CheckeredBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CheckeredBlock };
