import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const PlayerGhost: Entity = {
	paletteCategory: 'meta',
	paletteInfo: {
		title: 'Ghost Player',
		description: (
			<>
				<p>
					Drop one of these in your level and Mario will start there when
					testing.
				</p>
				<p>
					Checkout{' '}
					<a
						className="text-blue-500 hover:underline"
						href="/tips#ghost-player"
						target="_blank"
						rel="noreferer nofollower"
					>
						the tips page
					</a>{' '}
					for more info.
				</p>
			</>
		),
	},

	objectId: 0,
	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palettes: [
			[
				0x7f96,
				0x0,
				0x7fff,
				0x196,
				0x123b,
				0x1a9e,
				0x25fd,
				0x369e,
				0x475f,
				0x0,
				0x7f11,
				0x7f74,
				0x7fd8,
				0x31f,
				0x21f,
				0x1d,
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

	simpleRender(size) {
		return (
			<div
				className="PlayerGhost-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { PlayerGhost };
