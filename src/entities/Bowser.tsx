import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';

const fireballGraphicSets = [4, 5, 6, 7, 8, 9, 0xa, 0xb, 0xc, 0xd, 0xe, 0xf];
const Bowser: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-boss',
		title: 'Bowser',
		description:
			'SMB3 style Bowser. Be sure to user bowser bricks as the flooring, they are the only kind he can smash through.',
	},

	objectSets: ANY_OBJECT_SET,
	// TODO: see if this can be loosened. Also might need to change
	// to account for hammers
	spriteGraphicSets: [-1, 3, fireballGraphicSets, -1, 2, 0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x20,

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
			[144, 145, 146, 147],
			[160, 161, 162, 163],
			[176, 177, 178, 179],
			[32, 33, 34, 35],
			[48, 49, 50, 51],
		],
	},

	toSpriteBinary(x, y) {
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

		return <div className="Bowser-bg bg-cover bg-no-repeat" style={style} />;
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
			<div className="relative Bowser-bg bg-cover bg-no-repeat" style={style}>
				<div className="absolute" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { Bowser };
