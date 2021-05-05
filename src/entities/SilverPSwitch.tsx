import React from 'react';
import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const SilverPSwitch: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Silver P-Switch',
		description: 'Turns all enemies into silver coins for massive 1ups',
	},

	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xc1,

	resource: {
		palette: [
			0x7ffb,
			0x7fff,
			0x0,
			0x579f,
			0x6fff,
			0x6b5a,
			0x4631,
			0x5ad6,
			0x77bd,
			0x112,
			0x5a1f,
			0x6ebf,
			0x7f9f,
			0x465f,
			0x1f,
			0x19,
		],
		romOffset: 0x18af80,
		tiles: [
			[4, 5],
			[36, 37],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="SilverPSwitch-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { SilverPSwitch };
