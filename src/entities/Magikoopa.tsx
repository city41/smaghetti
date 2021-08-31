import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const Magikoopa: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Magikoopa',
		description:
			"There needs to be plenty of terrain he can stand on, otherwise he won't show up.",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, 0xc],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x10,
	width: 1,
	height: 2,

	resource: {
		romOffset: 0x18c914,
		palettes: [
			[
				0x7c1f,
				0x7fff,
				0x0,
				0x7e31,
				0x7eb5,
				0x7f39,
				0x25de,
				0x273f,
				0x2539,
				0x253e,
				0x253f,
				0x3279,
				0x439f,
				0x5bff,
				0x77ff,
				0x0,
			],
		],
		tiles: [
			[386, 387],
			[418, 419],
			[392, 393],
			[424, 425],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this.objectId, 'Magikoopa');
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '50% 100%' };

		return (
			<div className="Magikoopa-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = { width: TILE_SIZE, height: TILE_SIZE * 2 };

		return <div style={style} className="Magikoopa-bg bg-cover" />;
	},
};

export { Magikoopa };
