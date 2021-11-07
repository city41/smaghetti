import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets, parseSimpleObject } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const WoodFloorGiantLeftEndCap: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-giant',
		title: 'Wood Floor - Giant Left End Cap',
	},

	objectSets: encodeObjectSets([
		[11, 11],
		[13, 11],
		[5, 11],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	dimensions: 'none',
	objectId: 0x34,
	emptyBank: 1,
	width: 1,
	height: 2,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				379,
				6687,
				12959,
				19327,
				13924,
				18186,
				24497,
				3443,
				6648,
				11869,
				16095,
				0,
				0,
			],
		],
		tiles: [
			[
				{
					romOffset: 1584308,
					tileIndex: 144,
				},
				975,
			],
			[
				{
					romOffset: 1584308,
					tileIndex: 145,
				},
				991,
			],
			[
				{
					romOffset: 1584308,
					tileIndex: 146,
				},
				1005,
			],
			[
				{
					romOffset: 1584308,
					tileIndex: 147,
				},
				1021,
			],
		],
		romOffset: 1534952,
	},

	toObjectBinary({ x, y }) {
		return [0x42, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0x42, this);
	},

	simpleRender(size) {
		return (
			<div
				className="WoodFloorGiantLeftEndCap-bg bg-no-repeat bg-center"
				style={{ width: size, height: size, backgroundSize: '50% 100%' }}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
		};

		return <div className="WoodFloorGiantLeftEndCap-bg" style={style} />;
	},
};

export { WoodFloorGiantLeftEndCap };
