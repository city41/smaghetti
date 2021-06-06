import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const RotatingCheckeredBlockSmall: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Rotating Checkered Block - Small',
		description: 'Usually found in ghostly settings',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	rotationGraphicSet: 0,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xde,

	resource: {
		romOffset: 0x18af80,
		palette: [
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
		tiles: [
			[260, 261],
			[292, 293],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="RotatingCheckeredBlockSmall-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div className="RotatingCheckeredBlockSmall-bg bg-cover" style={style} />
		);
	},
};

export { RotatingCheckeredBlockSmall };
