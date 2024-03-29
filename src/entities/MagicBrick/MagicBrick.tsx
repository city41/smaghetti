import type { Entity } from '../types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
	parseCellObjectsParam1WidthParam2Height,
} from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const MagicBrick: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Magic Brick',
		description: 'A brick you can pick up and throw',
	},

	layer: 'stage',
	editorType: 'cell',

	dimensions: 'xy',
	objectId: 0x2b,
	param1: 'width',
	param2: 'height',
	emptyBank: 1,

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x39ce,
				0x4a52,
				0x6318,
				0x77bd,
				0x732c,
				0x7fd2,
				0x7ffb,
				0x5810,
				0x7597,
				0x7e1d,
			],
		],
		romOffset: 0x131fe0,
		tiles: [
			[308, 310],
			[309, 311],
		],
	},

	toObjectBinary({ x, y, w, h }) {
		return [getBankParam1(1, w), y, x, this.objectId, h];
	},

	parseObject(data, offset, inGame) {
		if (
			inGame &&
			data[offset] >= 0x40 &&
			(data[offset + 4] >= 0x40 || data[offset + 4] === 0)
		) {
			// this is an in game, four byte magic brick with default height of 1
			return parseCellObjectsParam1Width(data, offset, this);
		} else {
			return parseCellObjectsParam1WidthParam2Height(data, offset, this);
		}
	},

	simpleRender(size) {
		return (
			<div
				className="MagicBrick-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { MagicBrick };
