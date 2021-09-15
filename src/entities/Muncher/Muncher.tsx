import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { encodeObjectSets, parseSimpleObject } from '../util';
import { objectSets } from './objectSets';

const Muncher: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Muncher',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x15,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				521,
				8846,
				14130,
				18359,
				500,
				666,
				895,
				21,
				3485,
				703,
				13824,
				19109,
				23337,
			],
		],
		tiles: [
			[
				{
					romOffset: 1455976,
					tileIndex: 678,
				},
				250,
			],
			[249, 251],
		],
		romOffset: 1534952,
	},

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="Muncher-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Muncher };
