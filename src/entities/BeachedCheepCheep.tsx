import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_16, ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const BeachedCheepCheep: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Beached Cheep Cheep',
		description: 'Flops around on the land',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x72,

	toSpriteBinary(x, y) {
		return [1, 0x2c, x, y];
	},

	simpleRender(width, height) {
		return (
			<div
				className="relative RedCheepCheep-bg bg-cover"
				style={{ width, height }}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					beached
				</div>
			</div>
		);
	},

	render() {
		const width = TILE_SIZE;
		const height = TILE_SIZE;

		const labelStyle = {
			fontSize: 2,
			bottom: 0,
		};

		return (
			<div
				className="relative RedCheepCheep-bg bg-cover"
				style={{ width, height }}
			>
				<div
					className="absolute left-0 w-full text-center bg-black text-white"
					style={labelStyle}
				>
					beached
				</div>
			</div>
		);
	},
};

export { BeachedCheepCheep };
