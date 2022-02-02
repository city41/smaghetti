import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1HeightParam2WidthEntityObject,
} from './util';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { ResizableRect } from '../components/ResizableRect';

const RECT_CLASSES = [
	['WoodFloorUpperLeft-bg', 'WoodFloorTop-bg', 'WoodFloorUpperRight-bg'],
	['WoodFloorLeft-bg', 'WoodFloorInternal-bg', 'WoodFloorRight-bg'],
	['WoodFloorLeft-bg', 'WoodFloorInternal-bg', 'WoodFloorRight-bg'],
];

const palette = [
	0x7f96,
	0x7fff,
	0x0,
	0x17b,
	0x1a1f,
	0x329f,
	0x4b7f,
	0x3664,
	0x470a,
	0x5fb1,
	0xd73,
	0x19f8,
	0x2e5d,
	0x3edf,
];

const WoodFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Wood Floor',
	},

	objectSets: encodeObjectSets([
		[1, 1],
		[1, 0x14],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { width: 2, height: 1 },
	dimensions: 'none',
	objectId: 0xb,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,

	resources: {
		WoodFloorLeft: {
			palettes: [palette],
			romOffset: 0x163768,
			tiles: [
				[614, 611],
				[614, 611],
			],
		},
		WoodFloorRight: {
			palettes: [palette],
			romOffset: 0x163768,
			tiles: [
				[610, 525],
				[610, 525],
			],
		},
		WoodFloorTop: {
			palettes: [palette],
			romOffset: 0x163768,
			tiles: [
				[513, 513],
				[608, 609],
			],
		},
		WoodFloorUpperLeft: {
			palettes: [palette],
			romOffset: 0x163768,
			tiles: [
				[522, 513],
				[602, 609],
			],
		},
		WoodFloorUpperRight: {
			palettes: [palette],
			romOffset: 0x163768,
			tiles: [
				[513, 523],
				[609, 524],
			],
		},
		WoodFloorInternal: {
			palettes: [palette],
			romOffset: 0x163768,
			tiles: [
				[610, 611],
				[610, 611],
			],
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
		return (
			<div
				className="WoodFloorTop-bg bg-cover"
				style={{ width: size, height: size }}
			/>
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
				maxW={0xfe}
				minH={1}
				styles={RECT_CLASSES}
				hideResizer={!entity}
				onSizeChange={(width, height) => onSettingsChange({ width, height })}
			/>
		);
	},
};

export { WoodFloor };
