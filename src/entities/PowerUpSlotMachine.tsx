import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { parseSimpleSprite } from './util';

const PowerUpSlotMachine: Entity = {
	paletteCategory: 'power-up',
	paletteInfo: {
		title: 'Power-up Slot Machine',
		description: '',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0xb7,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x2528,
				0x10a6,
				0x1909,
				0x254b,
				0x2d8d,
				0x35cf,
				0x3e11,
				0x294a,
				0x35ad,
				0x4210,
				0x4e73,
				0x4299,
				0x46db,
				0x4f1d,
			],
		],
		romOffset: 0x18af80,
		tiles: [
			[0, 1],
			[32, 33],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(
			data,
			offset,
			0,
			this.objectId,
			'PowerUpSlotMachine'
		);
	},

	simpleRender(size) {
		return (
			<div className="relative" style={{ width: size, height: size }}>
				<div className="absolute top-0 left-0 w-full h-full Mushroom-bg bg-cover opacity-50" />
				<div className="absolute top-0 left-0 w-full h-full PowerUpSlotMachine-bg bg-cover" />
			</div>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { PowerUpSlotMachine };
