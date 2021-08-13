import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets } from './util';
import { ANY_BELOW_0x16 } from './constants';

const BillBlasterNoBody: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-airship',
		title: 'Bill Blaster - Airship',
		description: 'Shoots Bullet Bills',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	// TODO: not sure 4 is needed. originally had ANY_SPRITE_GRAPHIC_SET
	// and it worked
	spriteGraphicSets: [-1, -1, -1, -1, 4, ANY_BELOW_0x16],
	layer: 'stage',
	editorType: 'entity',
	objectId: 0x1,
	emptyBank: 0,
	dimensions: 'none',

	resource: {
		romOffset: 0x16ad5c,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x39ce,
				0x4a52,
				0x6318,
				0x77bd,
				0x267c,
				0x435f,
				0x5bbf,
				0x3d89,
				0x4a0d,
				0x5650,
				0x62b2,
				0x6f15,
				0x7778,
			],
		],
		tiles: [
			[456, 458],
			[457, 459],
		],
	},

	toSpriteBinary({ x, y }) {
		// 0x90 is bullet bill
		// TODO: support flames
		return [1, 0x90, x, y];
	},

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};
		return <div className="BillBlasterNoBody-bg bg-cover" style={style} />;
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { BillBlasterNoBody };
