import React from 'react';
import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';

const LilSparky: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Lil Sparky',
	},

	spriteGraphicSets: [0, 0, 0, 0, 0, 0xd],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x4d,

	resource: {
		romOffset: 0x18c914,
		palette: [
			0x7fff,
			0x7fff,
			0x0,
			0x5ad6,
			0x739c,
			0x7fff,
			0x26ff,
			0x37f,
			0x5bff,
			0x37f,
			0x4d7f,
			0x0,
			0x0,
			0x0,
			0x0,
			0x0,
		],
		tiles: [
			[468, 469],
			[500, 501],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="LilSparky-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { LilSparky };
