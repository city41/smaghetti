import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const FireSnake: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Fire Snake',
		description:
			'Want it to be orange? Add a stone floor or fortress spike to your level',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [[2, 5], -1, -1, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x59,

	resource: {
		romOffset: 0x163768,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x11f1,
				0x1a75,
				0x22f9,
				0x318c,
				0x4631,
				0x56b5,
				0x2b5c,
				0xda,
				0x219e,
				0x363f,
				0x7eb7,
				0x6e11,
				0x596d,
			],
		],
		tiles: [
			[224, 225],
			[240, 241],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="FireSnake-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { FireSnake };
