import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import React from 'react';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// TODO: 0x80 is a green para troop that flies back and forth
const GreenParaTroopaPatrolling: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Koopa Troopa - Green Para Troopa, Patrolling',
		description: 'Flies back and forth',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x80,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x26b,
				0x1b10,
				0x13b4,
				0x25fd,
				0x369e,
				0x475f,
				0x1abf,
				0x1c,
				0x253f,
				0x463f,
				0x7ad1,
				0x6e2c,
				0x59a6,
			],
		],
		tiles: [
			[
				{ romOffset: 0x2282e4, tileIndex: 322 },
				{ romOffset: 0x1724f0, tileIndex: 967 },
			],
			[
				{ romOffset: 0x2282e4, tileIndex: 354 },
				{ romOffset: 0x1724f0, tileIndex: 983 },
			],
			[
				{ romOffset: 0x2282e4, tileIndex: 386 },
				{ romOffset: 0x2282e4, tileIndex: 387 },
			],
			[
				{ romOffset: 0x2282e4, tileIndex: 418 },
				{ romOffset: 0x2282e4, tileIndex: 419 },
			],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 100%',
		};

		return (
			<div
				className="relative GreenParaTroopaPatrolling-bg bg-center bg-no-repeat"
				style={style}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					patrol
				</div>
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
			marginTop: -TILE_SIZE,
			paddingTop: TILE_SIZE,
			backgroundPositionY: 2,
		};

		const labelStyle = {
			fontSize: 2,
			bottom: 0,
		};

		return (
			<div
				className="relative GreenParaTroopaPatrolling-bg bg-cover bg-no-repeat"
				style={style}
			>
				<TileSpace />
				<div
					className="absolute left-0 w-full text-center bg-black text-white"
					style={labelStyle}
				>
					patrol
				</div>
			</div>
		);
	},
};

export { GreenParaTroopaPatrolling };
