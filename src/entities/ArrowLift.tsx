import React from 'react';
import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const ArrowLift: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Arrow Lift',
		description: "A neat toy from Yoshi's Island",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xe8,

	resource: {
		romOffset: 0x18af80,
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x3192,
			0x1636,
			0x2a9c,
			0x1f4,
			0x29a,
			0x37f,
			0x42ff,
			0x4a52,
			0x6318,
			0x77bd,
			0x7ffb,
			0x7fd2,
			0x732c,
		],
		tiles: [
			[268, 269, 270, 271],
			[300, 301, 302, 303],
			[332, 333, 334, 335],
			[364, 365, 366, 367],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="ArrowLift-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 2, height: TILE_SIZE * 2 };
		const spaceStyle = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div className="relative ArrowLift-bg bg-cover" style={style}>
				<div className="absolute top-0 left-0" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { ArrowLift };
