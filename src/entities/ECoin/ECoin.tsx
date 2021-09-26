import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { smaghettiLogoECoinData } from './smaghettiLogoECoinData';

const ECoin: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'E-Coin',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xf9,
	width: 2,
	height: 2,

	resource: {
		romOffset: 0x1d0fec,
		palettes: [
			[
				0x7ff9,
				0xd0,
				0x7fff,
				0x67ff,
				0x23df,
				0x1bbe,
				0x171c,
				0x1299,
				0xe37,
				0xdb5,
				0x1a5b,
				0x2b3f,
				0x33bf,
				0x0,
				0x0,
				0x0,
			],
		],
		tiles: [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y, 1];
	},

	getECoinData(_entity: EditorEntity) {
		return smaghettiLogoECoinData;
	},

	simpleRender(size) {
		return (
			<div
				className="ECoin-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = {
			width: 2 * TILE_SIZE,
			height: 2 * TILE_SIZE,
		};

		return <div style={style} className="ECoin-bg bg-center bg-no-repeat" />;
	},
};

export { ECoin };
