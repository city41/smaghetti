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

const BLUE_COLOR_STYLE = { backgroundColor: 'rgb(24, 104, 200)' };
const RECT_CLASSES = [
	['ChoppyWater-bg', 'ChoppyWater-bg', 'ChoppyWater-bg'],
	[BLUE_COLOR_STYLE, BLUE_COLOR_STYLE, BLUE_COLOR_STYLE],
	[BLUE_COLOR_STYLE, BLUE_COLOR_STYLE, BLUE_COLOR_STYLE],
];

const ChoppyWater: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Choppy Water',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x25,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,

	defaultSettings: { width: 2, height: 1 },

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
				0x11,
				0x16,
				0x1a,
				0xdbe,
				0x123f,
				0x2bf,
			],
		],
		romOffset: 0x176be8,
		tiles: [
			[199, 199],
			[254, 254],
		],
	},

	toObjectBinary({ x, y, settings }): number[] {
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
				className="ChoppyWater-bg bg-cover"
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		return (
			<ResizableRect
				width={width}
				height={height}
				styles={RECT_CLASSES}
				hideResizer={!entity}
				minW={1}
				minH={1}
				maxW={26}
				onSizeChange={(width, height) => onSettingsChange({ width, height })}
			></ResizableRect>
		);
	},
};

export { ChoppyWater };
