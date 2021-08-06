import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets } from './util';

const WoodWindowFrame: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Wood Window Frame',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xe,
	emptyBank: 0,
	width: 2,
	height: 2,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				17932,
				23185,
				28469,
				32731,
				8378,
				8606,
				15007,
				304,
				435,
				6711,
				11931,
				16158,
				19359,
			],
			[
				31744,
				0,
				32767,
				24035,
				31400,
				5278,
				607,
				9055,
				8973,
				0,
				0,
				0,
				25535,
				0,
				0,
				0,
			],
		],
		tiles: [
			[272, 311, 311, 273],
			[
				273,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				274,
			],
			[
				273,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				273,
			],
			[274, 311, 311, 274],
		],
		romOffset: 1501760,
	},

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};
		return <div className="WoodWindowFrame-bg bg-cover" style={style} />;
	},

	render() {
		return this.simpleRender(TILE_SIZE * 2);
	},
};

export { WoodWindowFrame };
