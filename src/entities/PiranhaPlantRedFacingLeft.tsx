import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const PiranhaPlantRedFacingLeft: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-piranha',
		title: 'Piranha Plant - Facing Left, Red',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [10, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x56,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x101a,
				0x10bf,
				0x125f,
				0x25fd,
				0x369e,
				0x475f,
				0x139f,
				0x177,
				0x21c,
				0x29f,
				0x47bf,
				0x137f,
				0x25f,
			],
		],
		romOffset: 0x17a894,
		tiles: [
			[643, 644, 642],
			[{ tileIndex: 643, flip: 'v' }, { tileIndex: 644, flip: 'v' }, 658],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(
			data,
			offset,
			0,
			this.objectId,
			'PiranhaPlantRedFacingLeft'
		);
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 66%' };
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
			backgroundSize: '100%',
			marginTop: TILE_SIZE / 2,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: -TILE_SIZE * 0.5,
			left: 0,
		};

		return (
			<div
				className="relative PiranhaPlantRedFacingLeft-bg bg-center bg-no-repeat"
				style={style}
			>
				<TileSpace className="absolute" style={spaceStyle} />
			</div>
		);
	},
};

export { PiranhaPlantRedFacingLeft };
