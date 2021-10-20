import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, parseSimpleObject } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_BELOW_0x16 } from '../constants';
import { objectSets } from './objectSets';

const BuriedVegetableMontyMole: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Buried Vegetable - Monty Mole',
		description: 'A buried veggy that contains only a Monty Mole',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: [-1, -1, -1, -1, 5, ANY_BELOW_0x16],
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x69,
	payloadBank: 1,

	resources: {
		MontyMoleJump: {
			romOffset: 0x18fa98,
			tiles: [
				[132, 133],
				[164, 165],
			],
			palettes: [
				[
					0x4d7f,
					0x7fff,
					0x2108,
					0x61af,
					0x7633,
					0x7ed8,
					0x101a,
					0x10bf,
					0x129f,
					0x27bf,
					0x15d8,
					0x2a7d,
					0x3f1f,
					0x0,
					0x0,
					0x0,
				],
			],
		},
	},

	toObjectBinary({ x, y }) {
		return [0x40, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0x40, this);
	},

	simpleRender(size) {
		return (
			<div
				className="relative MontyMoleJump-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute top-0 left-0 w-full h-full BuriedVegetable-bg bg-cover" />
			</div>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { BuriedVegetableMontyMole };
