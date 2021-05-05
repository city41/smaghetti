import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

/**
 * Does not work in current fortress/underground rooms
 */
const LakituCloud: Entity = {
	paletteInfo: {
		title: 'Lakitu Cloud',
	},

	spriteGraphicSets: [0, 0, 0, 0, 0, 0],
	editorType: 'cell',
	dimensions: 'x',
	param1: 'width',
	objectId: 0x2d,
	emptyBank: 1,

	resource: {
		palette: [
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
		romOffset: 0x163768,
		tiles: [
			[362, 363],
			[378, 379],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="LakituCloud-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { LakituCloud };
