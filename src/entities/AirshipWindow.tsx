import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, getBankParam1, parseSimpleObject } from './util';

// These need object priority implemented to work properly.
// currently, it is not possible to put these on top of an airship platform
// you can put them next to one, but since the window is not solid, mario would
// fall through it, which is unexpected

const AirshipWindow: Entity = {
	// paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Airship Window',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	// these do allow width, but there is a tile gap between each window,
	// which Smaghetti can't handle. So not using their width param for now
	dimensions: 'none',
	objectId: 0x32,
	emptyBank: 1,
	param1: 'width',

	resource: {
		romOffset: 0x176be8,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x460c,
				0x5a91,
				0x6f35,
				0x7fdb,
				0x20ba,
				0x219e,
				0x3a9f,
				0x130,
				0x1b3,
				0x1a37,
				0x2e9b,
				0x3f1e,
				0x4b9f,
			],
		],
		tiles: [
			[682, 651],
			[684, 668],
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
		return <div className="AirshipWindow-bg bg-cover" style={style} />;
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { AirshipWindow };
