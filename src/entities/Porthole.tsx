import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, parseSimpleObject } from './util';

const Porthole: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Porthole',
		description: 'Normally Rocky Wrenchs pop out of them',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x30,
	emptyBank: 0,

	resource: {
		romOffset: 0x16ea40,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x39ce,
				0x4a52,
				0x6318,
				0x77bd,
				0x267c,
				0x435f,
				0x5bbf,
				0x3d89,
				0x4a0d,
				0x5650,
				0x62b2,
				0x6f15,
				0x7778,
			],
		],
		tiles: [
			[234, 235],
			[288, 289],
		],
	},

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};
		return <div className="Porthole-bg bg-cover" style={style} />;
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Porthole };
