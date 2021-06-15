import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets } from './util';

const FireBarBase: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Fire Bar Base',
		description:
			'These can be the base of a fire bar or roto disc, or just used on their own',
	},

	objectSets: encodeObjectSets([[2, 2]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x2,
	emptyBank: 0,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0xda,
				0x159e,
				0x2a3f,
				0x3eff,
				0x1f4,
				0x29a,
				0x37f,
				0xb1,
				0x155,
				0x19d9,
				0x2e3d,
				0x3ebf,
				0x13,
			],
		],
		romOffset: 0x167674,
		tiles: [
			[108, 110],
			[109, 111],
		],
	},

	toObjectBinary(x, y): number[] {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="FireBarBase-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { FireBarBase };
