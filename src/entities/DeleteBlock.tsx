import React from 'react';
import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1HeightParam2Width,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const DeleteBlock: Entity = {
	paletteInfo: {
		title: 'Delete Block',
		description: 'Creates holes in the bg map',
	},

	objectSets: encodeObjectSets([
		[1, 1],
		[2, 2],
		[9, 3],
		[0xd, 3],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'height',
	param2: 'width',
	objectId: 0x70,
	emptyBank: 1,

	// delete blocks have no visual component, this palette plus these tiles
	// yields a fully black square
	resource: {
		palettes: [
			[
				0x23df,
				0x7fff,
				0x0,
				0x4e71,
				0x5ef5,
				0x6f79,
				0x7bdd,
				0x13,
				0x19,
				0x1f,
				0x112,
				0x5a1f,
				0x6ebf,
				0x7f9f,
				0x579f,
				0x6fff,
			],
		],
		romOffset: 0x167674,
		tiles: [
			[613, 613],
			[613, 613],
		],
	},

	toObjectBinary({ x, y, w, h }) {
		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1HeightParam2Width(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="DeleteBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { DeleteBlock };
