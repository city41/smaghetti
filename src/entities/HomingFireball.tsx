import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const HomingFireball: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Homing Fireball',
		description: "An enemy originally from Yoshi's Island, and unused in SMA4",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, 3, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xb4,

	resource: {
		romOffset: 0x18fa98,
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
			[8, 9],
			[40, 41],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="HomingFireball-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE);
	},
};

export { HomingFireball };
