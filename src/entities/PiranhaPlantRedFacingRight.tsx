import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const PiranhaPlantRedFacingRight: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-piranha',
		title: 'Piranha Plant - Facing Right, Red',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [10, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x57,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '100% 66%',
			transform: 'scale(-1, 1)',
		};
		return (
			<div
				className="PiranhaPlantRedFacingLeft-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 1.5,
			height: TILE_SIZE,
			marginTop: TILE_SIZE / 2,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: -TILE_SIZE * 0.5,
			left: 0,
		};

		return (
			<div className="relative" style={style}>
				<div
					className="absolute w-full h-full PiranhaPlantRedFacingLeft-bg bg-center bg-no-repeat"
					style={{ transform: 'scale(-1, 1)', left: TILE_SIZE }}
				/>
				<TileSpace className="absolute" style={spaceStyle} />
			</div>
		);
	},
};

export { PiranhaPlantRedFacingRight };
