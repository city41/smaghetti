import React from 'react';
import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1HeightParam2WidthEntityObject,
} from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { ResizableRect } from '../components/ResizableRect';

const RECT_CLASSES = [
	['StoneFloorUpperLeft-bg', 'StoneFloorTop-bg', 'StoneFloorUpperRight-bg'],
	['StoneFloorLeft-bg', 'StoneFloorInternal-bg', 'StoneFloorRight-bg'],
	['StoneFloorLowerLeft-bg', 'StoneFloorBottom-bg', 'StoneFloorLowerRight-bg'],
];

const palette = [
	0x7f96,
	0x7fff,
	0x0,
	0x620d,
	0x7271,
	0x7b15,
	0x7fbb,
	0x2cb5,
	0x459b,
	0x563e,
	0x252,
	0x1ab7,
	0x331c,
	0x437f,
	0x6abf,
	0x7b5f,
];

const StoneFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Stone Floor',
	},

	objectSets: encodeObjectSets([[9, 9]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	param1: 'height',
	param2: 'width',
	objectId: 0x3f,
	emptyBank: 1,

	defaultSettings: { width: 2, height: 2 },

	resources: {
		StoneFloorInternal: {
			palettes: [palette],
			tiles: [
				[119, 119],
				[119, 119],
			],
			romOffset: 1501760,
		},
		StoneFloorBottom: {
			palettes: [palette],
			tiles: [
				[119, 119],
				[91, 91],
			],
			romOffset: 1501760,
		},
		StoneFloorLeft: {
			palettes: [palette],
			tiles: [
				[90, 119],
				[90, 119],
			],
			romOffset: 1501760,
		},
		StoneFloorLowerLeft: {
			palettes: [palette],
			tiles: [
				[90, 119],
				[50, 91],
			],
			romOffset: 1501760,
		},
		StoneFloorLowerRight: {
			palettes: [palette],
			tiles: [
				[119, 92],
				[91, 51],
			],
			romOffset: 1501760,
		},
		StoneFloorRight: {
			palettes: [palette],
			tiles: [
				[119, 92],
				[119, 92],
			],
			romOffset: 1501760,
		},
		StoneFloorTop: {
			palettes: [palette],
			tiles: [
				[89, 89],
				[119, 119],
			],
			romOffset: 1501760,
		},
		StoneFloorUpperLeft: {
			palettes: [palette],
			tiles: [
				[19, 89],
				[90, 119],
			],
			romOffset: 1501760,
		},
		StoneFloorUpperRight: {
			palettes: [palette],
			tiles: [
				[89, 20],
				[119, 92],
			],
			romOffset: 1501760,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const h = (settings.height ?? this.defaultSettings!.height) - 1;
		const w = (settings.width ?? this.defaultSettings!.width) - 1;

		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	parseObject(data, offset) {
		return parseParam1HeightParam2WidthEntityObject(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size };

		const cornerStyle = { width: size / 2, height: size / 2 };

		return (
			<div style={style} className="grid grid-cols-2 grid-rows-2">
				<div style={cornerStyle} className="StoneFloorUpperLeft-bg bg-cover" />
				<div style={cornerStyle} className="StoneFloorUpperRight-bg bg-cover" />
				<div style={cornerStyle} className="StoneFloorLowerLeft-bg bg-cover" />
				<div style={cornerStyle} className="StoneFloorLowerRight-bg bg-cover" />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = settings.height ?? this.defaultSettings!.height;
		const width = settings.width ?? this.defaultSettings!.width;

		return (
			<ResizableRect
				width={width}
				height={height}
				minW={2}
				minH={1}
				styles={RECT_CLASSES}
				hideResizer={!entity}
				onSizeChange={(width, height) => onSettingsChange({ width, height })}
			/>
		);
	},
};

export { StoneFloor };
