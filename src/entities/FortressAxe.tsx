import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const FortressAxe: Entity = {
	// paletteCategory: 'object',
	paletteInfo: {
		title: 'Fortress Axe',
		description: 'Send Bowser to his death',
		warning:
			'More research on this is needed, but if you try it, you need the whole setup: classic Bowser, lava, the bridge, and space for Mario to automatically walk',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, 2, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x28,

	resource: {
		romOffset: 0x17a894,
		palettes: [
			[
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
		],
		tiles: [
			[{ tileIndex: 175, flip: 'h' }, 158, 175],
			[{ tileIndex: 175, flip: 'hv' }, 174, { tileIndex: 175, flip: 'v' }],
			[155, 190, 155],
		],
	},

	toSpriteBinary({ x, y }) {
		return [1, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 1, this);
	},

	simpleRender(size) {
		return (
			<div
				className="FortressAxe-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const BUFFER = 4;
		const style = {
			marginTop: -BUFFER,
			marginLeft: -BUFFER,
			width: TILE_SIZE + BUFFER * 2,
			height: TILE_SIZE + BUFFER * 2,
		};

		return <div className="FortressAxe-bg bg-cover" style={style} />;
	},
};

export { FortressAxe };
