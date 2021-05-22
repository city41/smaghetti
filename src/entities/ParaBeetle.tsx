import React from 'react';
import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_16, ANY_OBJECT_SET } from './constants';

const ParaBeetle: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'ParaBeetle',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [5, -1, -1, -1, -1, ANY_BELOW_16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x9f,

	resource: {
		romOffset: 0x163768,
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x101a,
			0x10bf,
			0x125f,
			0x25fd,
			0x369e,
			0x475f,
			0x139f,
			0x177,
			0x21c,
			0x29f,
			0x47bf,
			0x137f,
			0x25f,
		],
		tiles: [
			[936, 937],
			[952, 953],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="ParaBeetle-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { ParaBeetle };
