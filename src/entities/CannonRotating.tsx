import React from 'react';
import { TILE_SIZE } from '../tiles/constants';
import type { Entity } from './types';
import { encodeObjectSets, parseSimpleObject } from './util';

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const CannonRotating: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-airship',
		title: 'Cannon - Rotating',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		-1,
		0,
		graphicSets,
		graphicSets,
	],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xa,
	emptyBank: 0,
	width: 2,
	height: 3,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				14798,
				19026,
				25368,
				30653,
				9852,
				17247,
				23487,
				15753,
				18957,
				22096,
				25266,
				28437,
				30584,
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
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1501760,
					tileIndex: 332,
				},
				{
					romOffset: 1501760,
					tileIndex: 333,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				{
					romOffset: 1501760,
					tileIndex: 348,
				},
				{
					romOffset: 1501760,
					tileIndex: 349,
				},
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				678,
				679,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
			[653, 690, 700, 653],
			[669, 691, 701, 669],
			[
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
				686,
				687,
				{
					romOffset: 1253344,
					tileIndex: 255,
					palette: 1,
				},
			],
		],
		romOffset: 1534952,
	},

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0, this);
	},

	toSpriteBinary({ x, y }) {
		return [1, 0x93, x, y + 1];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '66% 100%',
		};

		return (
			<div className="CannonRotating-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = {
			width: 2 * TILE_SIZE,
			height: 3 * TILE_SIZE,
		};

		return <div style={style} className="CannonRotating-bg bg-cover" />;
	},
};

export { CannonRotating };
