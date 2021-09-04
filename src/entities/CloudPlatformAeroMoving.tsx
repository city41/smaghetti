import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const CloudPlatformAeroMoving: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-sky',
		title: 'Cloud Platform - Aero, Moving',
		description: 'Slowly moves to the left',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [5, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x2c,
	width: 3,
	height: 1,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x3192,
				0x1636,
				0x2a9c,
				0x1f4,
				0x29a,
				0x37f,
				0x42ff,
				0x4a52,
				0x6318,
				0x77bd,
				0x7ffb,
				0x7fd2,
				0x732c,
			],
		],
		romOffset: 0x163768,
		tiles: [
			[896, 897, 897, 897, 898, 899],
			[912, 913, 913, 913, 914, 915],
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
			'CloudPlatformAeroMoving'
		);
	},

	simpleRender(size) {
		const style = { width: size, height: size / 3 };

		return (
			<div
				className="flex flex-col items-center justify-start"
				style={{ width: size, height: size }}
			>
				<div className="flex flex-row items-center justify-center">
					<FaArrowLeft />
				</div>
				<div className="CloudPlatformAeroMoving-bg bg-cover" style={style} />
			</div>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 3, height: TILE_SIZE };
		return (
			<div className="CloudPlatformAeroMoving-bg bg-cover" style={style} />
		);
	},
};

export { CloudPlatformAeroMoving };
