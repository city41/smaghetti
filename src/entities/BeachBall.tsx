import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const BeachBall: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Beach Ball',
		description: 'Works like the logs in Mario 64',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	rotationGraphicSet: 2,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xe3,

	resource: {
		romOffset: 0x18af80,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x3192,
				0x1636,
				0x2a9c,
				0x1f4,
				0x29a,
				0x37f,
				0x42ff,
				0x4a52,
				0x6318,
				0x77bd,
				0x7ffb,
				0x7fd2,
				0x732c,
			],
		],
		tiles: [
			[384, 385, 386, 387],
			[416, 417, 418, 419],
			[448, 449, 450, 451],
			[480, 481, 482, 483],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="BeachBall-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 2, height: TILE_SIZE * 2 };
		const spaceStyle = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div className="relative BeachBall-bg bg-cover" style={style}>
				<div className="absolute top-0 left-0" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { BeachBall };
