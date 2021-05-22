import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const FireFlower: Entity = {
	paletteCategory: 'power-up',
	paletteInfo: {
		title: 'Fire Flower',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x19,

	resource: {
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
			[
				{
					romOffset: 0x163768,
					tileIndex: 265,
				},
				{ romOffset: 0x163768, tileIndex: 265, flip: 'h' },
			],

			[
				{
					romOffset: 0x163768,
					tileIndex: 281,
				},
				{ romOffset: 0x163768, tileIndex: 281, flip: 'h' },
			],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="FireFlower-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { FireFlower };
