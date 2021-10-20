import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const PiranhaPlantRedFacingRightFire: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-piranha',
		title: 'Piranha Plant - Facing left, Red, Fire',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [10, -1, -1, graphicSetValues, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xff,
	param1: 'other',

	toSpriteBinary({ x, y }) {
		// fifth byte
		// 0 -- face right
		// 1 -- face left
		return [0, this.objectId, x, y, 0];
	},

	parseSprite(data, offset) {
		const result = parseSimpleSprite(data, offset, 0, this);

		if (result && data[result.offset] === 0) {
			return {
				...result,
				offset: result.offset + 1,
			};
		}
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
				className="PiranhaPlantRedFacingLeftFire-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 1.5,
			height: TILE_SIZE,
			backgroundSize: '100%',
			marginTop: TILE_SIZE / 2,
		};

		const spaceStyle = {
			top: -TILE_SIZE / 2,
			left: 0,
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div className="relative" style={style}>
				<div
					className="absolute top-0 left-0 w-full h-full PiranhaPlantRedFacingLeftFire-bg bg-center bg-no-repeat"
					style={{ transform: 'scale(-1, 1)' }}
				/>
				<TileSpace className="absolute" style={spaceStyle} />
			</div>
		);
	},
};

export { PiranhaPlantRedFacingRightFire };
