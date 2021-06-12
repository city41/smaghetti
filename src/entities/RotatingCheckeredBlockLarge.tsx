import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const RotatingCheckeredBlockLarge: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Rotating Checkered Block - Large',
		description: 'Usually found in ghostly settings',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	rotationGraphicSet: 0,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xdd,

	resource: {
		romOffset: 0x18af80,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x39ce,
				0x4a52,
				0x5ef7,
				0x7a8b,
				0x7f6e,
				0x7fd6,
				0x6f7b,
				0x19f8,
				0x2e5c,
				0x42ff,
				0x1b1f,
				0x1a1f,
				0x1d,
			],
		],
		tiles: [
			[256, 257, 258, 259],
			[288, 289, 290, 291],
			[320, 321, 322, 323],
			[352, 353, 354, 355],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="RotatingCheckeredBlockLarge-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 2, height: TILE_SIZE * 2 };
		const spaceStyle = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div
				className="relative RotatingCheckeredBlockLarge-bg bg-cover"
				style={style}
			>
				<div className="absolute top-0 left-0" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { RotatingCheckeredBlockLarge };
