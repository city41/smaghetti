import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1HeightParam2WidthEntityObject,
} from './util';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { ResizableRect } from '../components/ResizableRect';

const RED_COLOR_STYLE = { backgroundColor: 'rgb(208, 0, 0)' };
const RECT_CLASSES = [
	['Lava-bg', 'Lava-bg', 'Lava-bg'],
	[RED_COLOR_STYLE, RED_COLOR_STYLE, RED_COLOR_STYLE],
	[RED_COLOR_STYLE, RED_COLOR_STYLE, RED_COLOR_STYLE],
];

const Lava: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Lava',
	},

	objectSets: encodeObjectSets([
		[2, 10],
		[2, 11],
		[2, 12],
		[2, 13],
		[2, 14],
		[2, 15],
		[2, 1],
		[2, 2],
		[2, 3],
		[2, 4],
		[2, 5],
		[2, 6],
		[2, 8],
		[2, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 2, height: 1 },
	dimensions: 'none',
	objectId: 0x30,
	param1: 'height',
	param2: 'width',
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
				0x11,
				0x16,
				0x1a,
				0xdbe,
				0x123f,
				0x2bf,
			],
		],
		romOffset: 0x131fe0,
		tiles: [
			[264, 266],
			[265, 267],
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
			<div className="Lava-bg bg-cover" style={{ width: size, height: size }} />
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

export { Lava };
