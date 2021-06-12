import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

const LavaLotus: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-water',
		title: 'Lava Lotus',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, 1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x67,

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
			[706, 707, { tileIndex: 706, flip: 'h' }],
			[722, 723, { tileIndex: 722, flip: 'h' }],
			[738, 739, { tileIndex: 738, flip: 'h' }],
			[754, 755, { tileIndex: 754, flip: 'h' }],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="LavaLotus-bg bg-center bg-no-repeat"
				style={{ width: size, height: size, backgroundSize: '75% 100%' }}
			/>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 1.5, height: TILE_SIZE * 2 };
		const spaceStyle = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div style={style} className="relative LavaLotus-bg bg-cover">
				<TileSpace style={spaceStyle} className="absolute top-0 left-0" />
			</div>
		);
	},
};

export { LavaLotus };
