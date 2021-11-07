import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, parseSimpleObject } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_BELOW_0x16 } from '../constants';
import { objectSets } from './objectSets';

const graphicSets = [
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	24,
	25,
	26,
	27,
];

const BuriedVegetableKoopaShell: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Buried Vegetable - Koopa Shell',
		description: 'A buried veggy that contains only a giant koopa shell',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: [-1, -1, -1, graphicSets, -1, ANY_BELOW_0x16],
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x7e,
	payloadBank: 1,

	toObjectBinary({ x, y }) {
		return [0x40, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0x40, this);
	},

	simpleRender(size) {
		return (
			<div
				className="relative KoopaShell-bg bg-cover"
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

export { BuriedVegetableKoopaShell };
