import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const Porcupo: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Porcupo',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xe],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xee,

	resource: {
		romOffset: 0x18c914,
		palette: [
			0x7fb4,
			0x7fff,
			0x0,
			0x75ad,
			0x7a94,
			0x7f39,
			0x25de,
			0x273f,
			0x1b1d,
			0x2fbf,
			0x53ff,
			0x119,
			0x167b,
			0x6ab2,
			0x7b98,
			0x7bdd,
		],
		tiles: [
			[578, 579],
			[610, 611],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="Porcupo-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Porcupo };
