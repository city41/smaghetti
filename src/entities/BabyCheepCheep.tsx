import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const BabyCheepCheep: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Baby Cheep Cheep',
		description:
			"Normally they come out of big bertha's mouth. But you can spawn them separately too!",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [7, -1, -1, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x48,

	resource: {
		romOffset: 0x167674,
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
			[647, 648],
			[663, 664],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="BabyCheepCheep-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { BabyCheepCheep };
