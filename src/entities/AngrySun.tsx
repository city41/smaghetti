import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';
import { parseSimpleSprite } from './util';

const AngrySun: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Angry Sun',
		description:
			"Chases after Mario. You need a long level, it doesn't start chasing for a long time.",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [2, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xaf,

	resource: {
		romOffset: 0x163768,
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
		tiles: [
			[204, 205, 206, 207],
			[220, 221, 222, 223],
			[236, 237, 238, 239],
			[252, 253, 254, 255],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="AngrySun-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
			marginLeft: -TILE_SIZE * 0.75,
		};
		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			left: TILE_SIZE * 0.75,
		};

		return (
			<div style={style} className="relative AngrySun-bg bg-cover">
				<TileSpace style={spaceStyle} className="absolute top-0 left-0" />
			</div>
		);
	},
};

export { AngrySun };
