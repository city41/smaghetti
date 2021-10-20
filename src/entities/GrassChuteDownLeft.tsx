import type { Entity } from './types';
import { encodeObjectSets, parseSimpleObject } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const GrassChuteDownLeft: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-large',
		title: 'Grass Chute - Down Left',
	},

	objectSets: encodeObjectSets([
		[14, 3],
		[3, 3],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x31,
	emptyBank: 0,
	width: 8,
	height: 7,

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="GrassChuteDownLeft-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: `100% ${(4 / 5) * 100}%`,
				}}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 8,
			height: TILE_SIZE * 7,
		};

		return (
			<div className="GrassChuteDownLeft-bg bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},

	getProblem({ entity }) {
		if (entity.x < 0) {
			return "Can't extend outside the front of the level";
		}
	},
};

export { GrassChuteDownLeft };
