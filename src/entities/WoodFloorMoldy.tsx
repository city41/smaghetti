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
	[
		'WoodFloorMoldyUpperLeft-bg',
		'WoodFloorMoldyTop-bg',
		'WoodFloorMoldyUpperRight-bg',
	],
	[
		'WoodFloorMoldyLeft-bg',
		'WoodFloorMoldyInternal-bg',
		'WoodFloorMoldyRight-bg',
	],
	[
		'WoodFloorMoldyLeft-bg',
		'WoodFloorMoldyInternal-bg',
		'WoodFloorMoldyRight-bg',
	],
];

const palette = [
	0x7f96,
	0x7fff,
	0x0,
	0x209,
	0x228e,
	0x3732,
	0x47b7,
	0x1f4,
	0x29a,
	0x37f,
	0x15,
	0xd9d,
	0x2bf,
	0x3600,
	0x4aa5,
	0x5b29,
];

const WoodFloorMoldy: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Wood Floor - Moldy',
	},

	objectSets: encodeObjectSets([[1, 1]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { width: 2, height: 1 },
	dimensions: 'none',
	objectId: 0xc,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,

	resources: {
		WoodFloorMoldyLeft: {
			palettes: [palette],
			romOffset: 0x163768,
			tiles: [
				[614, 611],
				[614, 611],
			],
		},
		WoodFloorMoldyRight: {
			palettes: [palette],
			romOffset: 0x163768,
			tiles: [
				[610, 525],
				[610, 525],
			],
		},
		WoodFloorMoldyTop: {
			palettes: [palette],
			romOffset: 0x163768,
			tiles: [
				[513, 513],
				[608, 609],
			],
		},
		WoodFloorMoldyUpperLeft: {
			palettes: [palette],
			romOffset: 0x163768,
			tiles: [
				[522, 513],
				[602, 609],
			],
		},
		WoodFloorMoldyUpperRight: {
			palettes: [palette],
			romOffset: 0x163768,
			tiles: [
				[513, 523],
				[609, 524],
			],
		},
		WoodFloorMoldyInternal: {
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
				className="WoodFloorMoldyTop-bg bg-cover"
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

export { WoodFloorMoldy };
