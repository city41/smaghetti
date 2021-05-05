import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const OBJECT_ID = 0x49;

// TODO: should this be called spike?
const Stalactite: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Stalactite',
	},

	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	editorType: 'cell',
	dimensions: 'none',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x520c,
			0x6270,
			0x72f3,
			0x7b77,
			0x1f4,
			0x29a,
			0x37f,
			0x7e93,
			0x7f17,
			0x7fbc,
			0x7ffe,
			0x1df,
			0x31f,
		],
		romOffset: 0x16ea40,
		tiles: [
			[122, 250],
			[123, 250],
		],
	},

	toObjectBinary(x, y) {
		return [0, y, x, OBJECT_ID];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="Stalactite-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { Stalactite };
