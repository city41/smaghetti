import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const Fishbone: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Fishbone',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xd],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xd1,

	resource: {
		romOffset: 0x18c914,
		palettes: [
			[
				0x7fff,
				0x7fff,
				0x0,
				0x5ad6,
				0x739c,
				0x7fff,
				0x26ff,
				0x37f,
				0x5bff,
				0x37f,
				0x4d7f,
			],
		],
		tiles: [
			[408, 409, 410],
			[440, 441, { tileIndex: 410, flip: 'v' }],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 66%' };
		return <div className="Fishbone-bg bg-center bg-no-repeat" style={style} />;
	},

	render() {
		const width = TILE_SIZE * 1.5;
		const height = TILE_SIZE;

		const style = { width, height, paddingRight: TILE_SIZE * 0.5 };
		return (
			<div className="Fishbone-bg bg-cover bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { Fishbone };
