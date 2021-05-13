import React from 'react';
import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_16, ANY_OBJECT_SET } from './constants';

const BusterBeetle: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Buster Beetle',
		description:
			'Will pick up any magic bricks it finds and throw them at Mario',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [3, -1, -1, -1, -1, ANY_BELOW_16],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x40,

	resource: {
		romOffset: 0x163768,
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x26b,
			0x1b10,
			0x13b4,
			0x25fd,
			0x369e,
			0x475f,
			0x1abf,
			0x1c,
			0x253f,
			0x463f,
			0x7ad1,
			0x6e2c,
			0x59a6,
		],
		tiles: [
			[682, 683],
			[698, 699],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="BusterBeetle-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { BusterBeetle };
