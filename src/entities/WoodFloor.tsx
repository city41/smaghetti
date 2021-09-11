import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1HeightParam2Width,
} from './util';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { ResizableRect } from '../components/ResizableRect';

const RECT_CLASSES = [
	['WoodFloorUpperLeft-bg', 'WoodFloorTop-bg', 'WoodFloorUpperRight-bg'],
	['WoodFloorLeft-bg', 'WoodFloor-bg', 'WoodFloorRight-bg'],
	['WoodFloorLeft-bg', 'WoodFloor-bg', 'WoodFloorRight-bg'],
];

const WoodFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Wood Floor',
	},

	objectSets: encodeObjectSets([[1, 1]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 2, height: 1 },
	dimensions: 'none',
	objectId: 0xb,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,

	resource: {
		palettes: [
			[
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
				0x0,
				0x0,
			],
		],
		romOffset: 0x163768,
		tiles: [
			[610, 611],
			[610, 611],
		],
	},

	toObjectBinary({ x, y, settings }) {
		const h = (settings.height ?? this.defaultSettings!.height) - 1;
		const w = (settings.width ?? this.defaultSettings!.width) - 1;

		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	parseObject(data, offset) {
		debugger;
		return parseCellObjectsParam1HeightParam2Width(data, offset, this);
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
				minH={1}
				styles={RECT_CLASSES}
				hideResizer={!entity}
				onSizeChange={(width, height) => onSettingsChange({ width, height })}
			/>
		);
	},
};

export { WoodFloor };
