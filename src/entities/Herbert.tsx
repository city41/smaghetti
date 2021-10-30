import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, getBankParam1, parseSimpleObject } from './util';

const Herbert: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Herbert',
		description: "He's not hurting anyone",
	},

	objectSets: encodeObjectSets([[1, 4]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x88,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x65a3,
				0x7a8b,
				0x7f6e,
				0x7fd6,
				0x1594,
				0x2e39,
				0x42bd,
				0x2260,
				0x2ac8,
				0x3b4c,
				0x47b0,
				0x223f,
				0x57f3,
			],
		],
		romOffset: 0x163768,
		tiles: [
			[169, 169],
			[528, 529],
		],
	},

	toObjectBinary({ x, y }) {
		return [getBankParam1(1, 0), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0x40, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};

		return <div className="Herbert-bg bg-cover" style={style} />;
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Herbert };
