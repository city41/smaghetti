import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const BooFast: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Boo - Speedy',
		description: 'Like a normal Boo, but much faster when pursuing',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [[6, 8], -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x2a,

	toSpriteBinary({ x, y }) {
		return [1, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 1, this);
	},

	simpleRender(size) {
		return (
			<div
				className="relative Boo-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					speedy
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
			<div className="relative Boo-bg bg-cover" style={{ width, height }}>
				<div
					className="absolute left-0 w-full text-center bg-black text-white"
					style={labelStyle}
				>
					speedy
				</div>
			</div>
		);
	},
};

export { BooFast };
