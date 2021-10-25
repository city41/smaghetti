import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';
import { GeneratorFrame } from './components/GeneratorFrame';

const DolphinPod: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Dolphin - Horizontal Generator',
		description: 'These need some water to play in',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xa],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6b,

	toSpriteBinary({ x, y }) {
		return [1, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 1, this);
	},

	simpleRender(size) {
		const style = {
			backgroundPositionX: '30%',
			backgroundPositionY: '25%',
			backgroundSize: '80%',
		};

		return (
			<GeneratorFrame
				size={size}
				resourceClassName="HorizontalDolphin-bg bg-no-repeat"
				resourceStyle={style}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { DolphinPod };
