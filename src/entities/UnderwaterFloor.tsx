import React from 'react';
import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1HeightParam2WidthEntityObject,
} from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { ResizableRect } from '../components/ResizableRect';

const palette = [
	0x7f96,
	0x7fff,
	0x0,
	0x39ce,
	0x4a52,
	0x6318,
	0x77bd,
	0x732c,
	0x7fd2,
	0x7ffb,
	0x15d2,
	0x2257,
	0x2afc,
	0x37be,
];

const RECT_CLASSES = [
	[
		'UnderwaterFloorUpperLeft-bg',
		'UnderwaterFloorTop-bg',
		'UnderwaterFloorUpperRight-bg',
	],
	[
		'UnderwaterFloorLowerLeft-bg',
		'UnderwaterFloorBottom-bg',
		'UnderwaterFloorLowerRight-bg',
	],
	[
		'UnderwaterFloorLowerLeft-bg',
		'UnderwaterFloorBottom-bg',
		'UnderwaterFloorLowerRight-bg',
	],
];

const UnderwaterFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Underwater Floor',
		description: 'Intended for underwater levels, but can be used anywhere',
	},

	objectSets: encodeObjectSets([
		[6, 5],
		[6, 6],
		[6, 8],
		[8, 5],
		[8, 6],
		[8, 8],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	param1: 'height',
	param2: 'width',
	objectId: 0x31,
	emptyBank: 1,

	defaultSettings: { width: 2, height: 2 },

	resources: {
		UnderwaterFloorBottom: {
			palettes: [palette],
			romOffset: 0x17a894,
			tiles: [
				[
					{ romOffset: 0x16ad5c, tileIndex: 510 },
					{ romOffset: 0x16ad5c, tileIndex: 510 },
				],
				[587, 587],
			],
		},
		UnderwaterFloorLeft: {
			palettes: [palette],
			romOffset: 0x17a894,
			tiles: [
				[588, { romOffset: 0x16ad5c, tileIndex: 510 }],
				[588, { romOffset: 0x16ad5c, tileIndex: 510 }],
			],
		},
		UnderwaterFloorRight: {
			palettes: [palette],
			romOffset: 0x17a894,
			tiles: [
				[{ romOffset: 0x16ad5c, tileIndex: 510 }, 589],
				[{ romOffset: 0x16ad5c, tileIndex: 510 }, 589],
			],
		},
		UnderwaterFloorLowerLeft: {
			palettes: [palette],
			romOffset: 0x17a894,
			tiles: [
				[588, { romOffset: 0x16ad5c, tileIndex: 510 }],
				[523, 587],
			],
		},
		UnderwaterFloorLowerRight: {
			palettes: [palette],
			romOffset: 0x17a894,
			tiles: [
				[{ romOffset: 0x16ad5c, tileIndex: 510 }, 589],
				[587, 524],
			],
		},
		UnderwaterFloorTop: {
			palettes: [palette],
			romOffset: 0x17a894,
			tiles: [
				[586, 586],
				[
					{ romOffset: 0x16ad5c, tileIndex: 510 },
					{ romOffset: 0x16ad5c, tileIndex: 510 },
				],
			],
		},
		UnderwaterFloorUpperLeft: {
			palettes: [palette],
			romOffset: 0x17a894,
			tiles: [
				[521, 586],
				[588, { romOffset: 0x16ad5c, tileIndex: 510 }],
			],
		},
		UnderwaterFloorUpperRight: {
			palettes: [palette],
			romOffset: 0x17a894,
			tiles: [
				[586, 522],
				[{ romOffset: 0x16ad5c, tileIndex: 510 }, 589],
			],
		},
		UnderwaterFloorCenter: {
			palettes: [palette],
			romOffset: 0x16ad5c,
			tiles: [
				[510, 510],
				[510, 510],
			],
		},
	},

	toObjectBinary({ x, y, settings }) {
		const h = (settings.height ?? this.defaultSettings!.height) - 1;
		const w = (settings.width ?? this.defaultSettings!.width) - 1;

		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	parseObject(data, offset) {
		parseParam1HeightParam2WidthEntityObject(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size };

		const cornerStyle = { width: size / 2, height: size / 2 };

		return (
			<div style={style} className="grid grid-cols-2 grid-rows-2">
				<div
					style={cornerStyle}
					className="UnderwaterFloorUpperLeft-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="UnderwaterFloorUpperRight-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="UnderwaterFloorLowerLeft-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="UnderwaterFloorLowerRight-bg bg-cover"
				/>
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

export { UnderwaterFloor };
