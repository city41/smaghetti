import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

const DonutBlock: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Donut Block',
		description: "After they fall, they don't respawn in this game",
	},

	objectSets: encodeObjectSets([
		[2, 12],
		[2, 2],
		[2, 5],
		[2, 6],
		[2, 8],
	]),
	spriteGraphicSets: [[5, 6, 0xa], -1, -1, -1, -1, -1],
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'width',
	objectId: 0x3a,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x15d2,
				0x2257,
				0x2afc,
				0x37be,
				0x20ba,
				0x21be,
				0x32df,
				0x3192,
				0x1636,
				0x2a9c,
				0x42ff,
				0x0,
				0x0,
			],
		],
		romOffset: 0x167674,
		tiles: [
			[92, 94],
			[93, 95],
		],
	},

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="DonutBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { DonutBlock };
