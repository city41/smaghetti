import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const Clock: Entity = {
	paletteCategory: 'power-up',
	paletteInfo: {
		title: 'Clock',
		description: 'It just stops the timer for a little bit. Shrug.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0xbf,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palettes: [
			[
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
		],
		romOffset: 0x18af80,
		tiles: [
			[70, 71],
			[102, 103],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="Clock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Clock };
