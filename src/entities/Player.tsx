import React from 'react';
import type { Entity } from './types';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { PlayerDisplay } from './components/PlayerDisplay';
import { TILE_SIZE } from '../tiles/constants';

/*
 * Player is special since it's not really a sprite or object on the SMA4
 * side, but on the editor side it acts like a sprite
 */
const Player: Entity = {
	paletteInfo: {
		title: 'Player',
	},

	objectId: 0,
	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	resources: {
		MarioPlayer: {
			palettes: [
				[
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
		LuigiPlayer: {
			palettes: [
				[
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
					0x49c0,
					0x4a48,
					0x5b0c,
					0x3b6,
					0x311,
					0x28e,
				],
			],
			tiles: [
				[
					{
						romOffset: 0x1ae000,
						tileIndex: 563,
						flip: 'h',
						uncompressed: true,
						shift: -12,
					},
					{
						romOffset: 0x1ae000,
						tileIndex: 562,
						flip: 'h',
						uncompressed: true,
						shift: -12,
					},
				],
				[
					{
						romOffset: 0x1ae000,
						tileIndex: 579,
						flip: 'h',
						uncompressed: true,
						shift: -12,
					},
					{
						romOffset: 0x1ae000,
						tileIndex: 578,
						flip: 'h',
						uncompressed: true,
						shift: -12,
					},
				],
			],
		},
	},

	parseSprite() {
		return undefined;
	},

	simpleRender(size) {
		return (
			<PlayerDisplay
				marioClassName="MarioPlayer-bg"
				luigiClassName="LuigiPlayer-bg"
				size={size}
			/>
		);
	},

	render() {
		return (
			<PlayerDisplay
				marioClassName="MarioPlayer-bg"
				luigiClassName="LuigiPlayer-bg"
				size={TILE_SIZE}
			/>
		);
	},
};

export { Player };
