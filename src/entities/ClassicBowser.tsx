import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';

const fireballGraphicSets = [4, 5, 6, 7, 8, 9, 0xa, 0xb, 0xc, 0xd, 0xe, 0xf];
const ClassicBowser: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-boss',
		title: 'Bowser - Classic',
		description: 'SMB1 style Bowser',
	},

	objectSets: ANY_OBJECT_SET,
	// TODO: see if this can be loosened. Also might need to change
	// to account for hammers
	spriteGraphicSets: [-1, 3, fireballGraphicSets, -1, -1, 0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x27,

	resource: {
		romOffset: 0x17a894,
		palettes: [
			[
				0x7f96,
				0x0,
				0x7fff,
				0x224e,
				0x32d1,
				0x4355,
				0x1d9,
				0x2e5d,
				0x36be,
				0x6f7b,
				0x3224,
				0x46ca,
				0x576f,
				0x339f,
				0x12be,
				0x15e,
			],
		],
		tiles: [
			[80, 81, 82, 83],
			[96, 97, 98, 99],
			[112, 113, 114, 115],
			[
				{ romOffset: 0x18a6e4, tileIndex: 0 },
				{ romOffset: 0x18a6e4, tileIndex: 1 },
				{ romOffset: 0x18a6e4, tileIndex: 2 },
				{ romOffset: 0x18a6e4, tileIndex: 3 },
			],
			[
				{ romOffset: 0x18a6e4, tileIndex: 16 },
				{ romOffset: 0x18a6e4, tileIndex: 17 },
				{ romOffset: 0x18a6e4, tileIndex: 18 },
				{ romOffset: 0x18a6e4, tileIndex: 19 },
			],
		],
	},

	toSpriteBinary({ x, y }) {
		// TODO: the parameters almost certainly determine whether
		// he throws hammers and all that. Possibly also what enemy
		// he turns into if dies by fireballs
		return [1, this.objectId, x, y, 0, 0];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: `${(4 / 5) * 100}% 100%`,
			backgroundPosition: 'center center',
		};

		return (
			<div className="ClassicBowser-bg bg-cover bg-no-repeat" style={style} />
		);
	},

	render() {
		const width = TILE_SIZE * 2;
		const height = TILE_SIZE * 2.5;

		const style = {
			marginTop: TILE_SIZE * 0.5,
			width,
			height,
		};

		const spaceStyle = {
			top: -TILE_SIZE * 0.5,
			left: 0,
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div
				className="relative ClassicBowser-bg bg-cover bg-no-repeat"
				style={style}
			>
				<div className="absolute" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { ClassicBowser };
