import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const FlyingCheepCheepGenerator: Entity = {
	// paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-water',
		title: 'Cheep Cheep - Flying Generator',
		warning:
			'Once added to a level, the entire level has flying cheep cheeps throughout. There is probably a second sprite to turn them off?',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x60,

	toSpriteBinary(x, y) {
		return [1, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="relative RedCheepCheep-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					fly-gen
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
					fly-gen
				</div>
			</div>
		);
	},
};

export { FlyingCheepCheepGenerator };
