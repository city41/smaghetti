import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const DolphinHorizontal: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-water',
		title: 'Dolphin - Horizontal',
		description:
			'Needs to be above water to jump more than once. This is a single dolphin, for the "pod" look under generators.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xa],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xfc,

	resource: {
		romOffset: 0x18c914,
		palettes: [[0x7fd8, 0x7fff, 0x0, 0x75ad, 0x7a94, 0x7f39, 0x25de, 0x273f]],
		tiles: [
			[260, 261],
			[292, 293],
			[324, 325],
			[356, 357],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 1, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 50%' };
		return (
			<div
				className="HorizontalDolphin-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const width = TILE_SIZE * 2.5;
		const height = TILE_SIZE;

		const style = { width, height };
		return (
			<div
				className="relative HorizontalDolphin-bg bg-cover bg-no-repeat"
				style={style}
			>
				<TileSpace
					className="absolute"
					style={{ width: TILE_SIZE, height: TILE_SIZE }}
				/>
			</div>
		);
	},
};

export { DolphinHorizontal };
