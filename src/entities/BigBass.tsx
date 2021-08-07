import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

const BigBass: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-water',
		title: 'Big Bass',
		description: 'swims back and forth and jumps at Mario',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [[7, 8], -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x2d,

	resource: {
		romOffset: 0x167674,
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
			[640, 641, 642],
			[656, 657, 658],
			[672, 673, 674],
			[688, 689, 690],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="relative BigBass-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					bass
				</div>
			</div>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 1.5, height: TILE_SIZE * 2 };
		const spaceStyle = { width: TILE_SIZE, height: TILE_SIZE };
		const labelStyle = {
			fontSize: 2,
			left: TILE_SIZE * 0.33,
			bottom: -TILE_SIZE,
		};

		return (
			<div className="relative BigBass-bg" style={style}>
				<div className="absolute top-0 left-0" style={spaceStyle}>
					<TileSpace />
					<div
						className="absolute w-full text-center bg-black text-white"
						style={labelStyle}
					>
						bass
					</div>
				</div>
			</div>
		);
	},
};

export { BigBass };
