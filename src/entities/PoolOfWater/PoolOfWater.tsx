import React from 'react';
import type { Entity } from '../types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1HeightParam2WidthEntityObject,
} from '../util';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';
import { ResizableRect } from '../../components/ResizableRect';

const WATER_COLOR_STYLE = { backgroundColor: 'rgb(24, 139, 205)' };
const RECT_CLASSES = [
	['PoolOfWater-bg', 'PoolOfWater-bg', 'PoolOfWater-bg'],
	[WATER_COLOR_STYLE, WATER_COLOR_STYLE, WATER_COLOR_STYLE],
	[WATER_COLOR_STYLE, WATER_COLOR_STYLE, WATER_COLOR_STYLE],
];

const RECT_CLASSES_SINGLE_HEIGHT = [
	[WATER_COLOR_STYLE, WATER_COLOR_STYLE, WATER_COLOR_STYLE],
	[WATER_COLOR_STYLE, WATER_COLOR_STYLE, WATER_COLOR_STYLE],
	[WATER_COLOR_STYLE, WATER_COLOR_STYLE, WATER_COLOR_STYLE],
];

const PoolOfWater: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Pool of Water',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x3e,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,
	settingsType: 'single',
	defaultSettings: { width: 2, height: 2 },

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x620d,
				0x7271,
				0x7b15,
				0x7fbb,
				0x6623,
				0x7b2e,
				0x7fd6,
				0x15f8,
				0x2a5b,
				0x3add,
				0x475f,
			],
		],
		romOffset: 0x176be8,
		tiles: [
			[420, 421],
			[
				{ romOffset: 0x16ad5c, tileIndex: 504 },
				{ romOffset: 0x16ad5c, tileIndex: 504 },
			],
		],
	},

	toObjectBinary({ x, y, settings }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		return [getBankParam1(1, height - 1), y, x, this.objectId, width - 1];
	},

	parseObject(data, offset) {
		return parseParam1HeightParam2WidthEntityObject(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				style={{ width: size, height: size }}
				className="PoolOfWater-bg bg-cover"
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const rectClasses =
			height === 1 ? RECT_CLASSES_SINGLE_HEIGHT : RECT_CLASSES;

		return (
			<ResizableRect
				width={width}
				height={height}
				styles={rectClasses}
				hideResizer={!entity}
				minW={1}
				minH={1}
				maxW={26}
				onSizeChange={(width, height) => onSettingsChange({ width, height })}
			></ResizableRect>
		);
	},
};

export { PoolOfWater };
