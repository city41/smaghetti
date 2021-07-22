import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { GeneratorFrame } from './components/GeneratorFrame';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const FlyingCheepCheepGenerator: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Flying Cheep Cheep Generator',
		description:
			'Once added to a level, there will be flying cheep cheeps jumping everywhere.',
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
		const style = {
			backgroundPositionX: '20%',
			backgroundPositionY: '25%',
			backgroundSize: '60%',
		};

		return (
			<GeneratorFrame size={size} className="RedCheepCheep-bg" style={style} />
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { FlyingCheepCheepGenerator };
