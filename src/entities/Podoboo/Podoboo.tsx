import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET } from '../constants';
import { TileSpace } from '../TileSpace';
import { spriteGraphicSets } from './spriteGraphicSets';

const Podoboo: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Podoboo',
		description:
			'How high you place it determines the height of its jump. Needs to be over lava to jump more than once.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x9e,

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
			[238, { tileIndex: 238, flip: 'h' }],
			[254, { tileIndex: 254, flip: 'h' }],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="Podoboo-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			marginLeft: TILE_SIZE / 2,
		};
		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			left: -TILE_SIZE / 2,
		};

		return (
			<div style={style} className="relative Podoboo-bg bg-cover">
				<TileSpace style={spaceStyle} className="absolute top-0" />
			</div>
		);
	},
};

export { Podoboo };
