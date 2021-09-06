import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { parseSimpleSprite } from './util';

const Bomb: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Bomb',
		description:
			"An unused item in the game, but it's also a bit underwhelming.",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xb6,

	resource: {
		romOffset: 0x18af80,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x101a,
				0x10bf,
				0x125f,
				0x25fd,
				0x369e,
				0x475f,
				0x139f,
				0x177,
				0x21c,
				0x29f,
				0x47bf,
				0x137f,
				0x25f,
			],
		],
		tiles: [
			[28, 29],
			[60, 61],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const bombStyle = { width: '66%', height: '66%' };
		const fuseStyle = { width: '33%', height: '33%' };

		return (
			<div style={style} className="flex flex-col items-center">
				<div style={fuseStyle} className="BombFuse-bg bg-cover" />
				<div style={bombStyle} className="Bomb-bg bg-cover" />
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 1.5,
			marginTop: -TILE_SIZE * 0.5,
		};
		const bombStyle = { width: '100%', height: '66%' };
		const fuseStyle = { width: '50%', height: '33%' };

		return (
			<div style={style} className="flex flex-col items-center">
				<div style={fuseStyle} className="BombFuse-bg bg-cover" />
				<div style={bombStyle} className="Bomb-bg bg-cover" />
			</div>
		);
	},
};

export { Bomb };
