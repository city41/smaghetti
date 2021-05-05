import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const StarMan: Entity = {
	paletteCategory: 'power-up',
	paletteInfo: {
		title: 'Star Man',
	},

	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0xc,
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x3192,
			0x1636,
			0x2a9c,
			0x1f4,
			0x29a,
			0x37f,
			0x42ff,
			0x4a52,
			0x6318,
			0x77bd,
			0x7ffb,
			0x7fd2,
			0x732c,
		],
		romOffset: 0x134104,
		tiles: [
			[268, 269],
			[300, 301],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div className="StarMan-bg bg-cover" style={{ width: mw, height: mh }} />
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { StarMan };
