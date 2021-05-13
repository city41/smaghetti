import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const MetalDonutFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Metal Donut Floor',
		description: "These don't fall away",
	},

	objectSets: encodeObjectSets([[2, 2]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	editorType: 'cell',
	dimensions: 'xy',
	param1: 'height',
	param2: 'width',
	objectId: 0x28,
	emptyBank: 1,

	resource: {
		palette: [
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
		romOffset: 0x167674,
		tiles: [
			[80, 82],
			[81, 83],
		],
	},

	toObjectBinary(x, y, w, h) {
		return [getBankParam1(1, h), y, x, this.objectId!, w];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="MetalDonutFloor-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { MetalDonutFloor };
