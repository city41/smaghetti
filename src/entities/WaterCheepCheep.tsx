import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_16, ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const WaterCheepCheep: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Water Cheep Cheep',
		description: 'Casually swims back and forth in water levels',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x77,

	toSpriteBinary(x, y) {
		return [0, this.objectId!, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="relative GreenCheepCheep-bg bg-cover"
        style={{ width: size, height: size }}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					water
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
				className="relative GreenCheepCheep-bg bg-cover"
				style={{ width, height }}
			>
				<div
					className="absolute left-0 w-full text-center bg-black text-white"
					style={labelStyle}
				>
					water
				</div>
			</div>
		);
	},
};

export { WaterCheepCheep };
