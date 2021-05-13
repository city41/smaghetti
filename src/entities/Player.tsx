import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

/*
 * Player is special since it's not really a sprite or object on the SMA4
 * side, but on the editor side it acts like a sprite
 */
const Player: Entity = {
	paletteInfo: {
		title: 'Player',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x1b7,
			0x265d,
			0x277e,
			0x35fe,
			0x3a9e,
			0x4b3f,
			0x2171,
			0x4988,
			0x5e2a,
			0x72ac,
			0x28df,
			0x141b,
			0x16,
		],
		tiles: [
			[
				{
					romOffset: 0x19a000,
					tileIndex: 115,
					flip: 'h',
					uncompressed: true,
					shift: -12,
				},
				{
					romOffset: 0x19a000,
					tileIndex: 114,
					flip: 'h',
					uncompressed: true,
					shift: -12,
				},
			],
			[
				{
					romOffset: 0x19a000,
					tileIndex: 131,
					flip: 'h',
					uncompressed: true,
					shift: -12,
				},
				{
					romOffset: 0x19a000,
					tileIndex: 130,
					flip: 'h',
					uncompressed: true,
					shift: -12,
				},
			],
		],
	},

	simpleRender(mw, mh) {
		return (
			<div className="Player-bg bg-cover" style={{ width: mw, height: mh }} />
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { Player };
