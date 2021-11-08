import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const WATER_COLOR = 'rgb(24, 104, 200)';

const UnderwaterWater: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Underwater Water',
		description: 'Use this to create full on underwater rooms,',
		helpId: 'underwater-water',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x25,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,

	toObjectBinary({ x, y, w, h }): number[] {
		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	simpleRender(size) {
		return (
			<div
				style={{ width: size, height: size, backgroundColor: WATER_COLOR }}
			/>
		);
	},

	render() {
		return (
			<div
				className="opacity-30"
				style={{
					width: TILE_SIZE,
					height: TILE_SIZE,
					backgroundColor: WATER_COLOR,
				}}
			/>
		);
	},
};

export { UnderwaterWater };
