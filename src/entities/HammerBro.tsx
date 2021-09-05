import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const HammerBro: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-bro',
		title: 'Hammer Bro',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x81,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x11dc,
				0x169e,
				0x1b5f,
				0x25fd,
				0x369e,
				0x475f,
				0x111d,
				0x1a1f,
				0x329f,
				0x4b7f,
				0x7bda,
				0x6b55,
				0x56b1,
			],
		],
		romOffset: 0x1724f0,
		tiles: [
			[896, 897],
			[953, 954],
			[939, 940],
		],
	},

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
			backgroundSize: '66% 100%',
		};

		return (
			<div className="HammerBro-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 1.5,
			backgroundSize: '100%',
			marginTop: TILE_SIZE / 2,
			paddingTop: TILE_SIZE / 2,
		};

		return (
			<div className="HammerBro-bg bg-center bg-no-repeat" style={style}>
				<div className="w-full h-full" style={{ marginTop: -TILE_SIZE }}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { HammerBro };
