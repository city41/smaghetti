import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { ResizableRect } from '../components/ResizableRect';

const RECT_CLASSES = [
	[
		'UnderwaterFloorUpperLeft-bg',
		'UnderwaterFloorTop-bg',
		'UnderwaterFloorUpperRight-bg',
	],
	['UnderwaterFloorLeft-bg', 'UnderwaterFloor-bg', 'UnderwaterFloorRight-bg'],
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
	settingsType: 'single',
	defaultSettings: { width: 2, height: 2 },

	resource: {
		romOffset: 0x16ad5c,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x356b,
				0x4610,
				0x5a94,
				0x6b18,
				0x732c,
				0x7fd2,
				0x7ffb,
				0x59c9,
				0x6a51,
				0x7ad8,
				0x7f5c,
				0x29a,
				0x37f,
			],
		],
		tiles: [
			[510, 510],
			[510, 510],
		],
	},

	toObjectBinary(x, y, _w, _h, settings): number[] {
		const h = (settings.height ?? this.defaultSettings!.height) - 1;
		const w = (settings.width ?? this.defaultSettings!.width) - 1;

		return [getBankParam1(1, h), y, x, this.objectId, w];
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

	render(_showDetails, settings, onSettingsChange, entity) {
		const height = settings.height ?? this.defaultSettings!.height;
		const width = settings.width ?? this.defaultSettings!.width;

		return (
			<ResizableRect
				width={width}
				height={height}
				classes={RECT_CLASSES}
				hideResizer={!entity}
				onSizeChange={(width, height) => onSettingsChange({ width, height })}
			/>
		);
	},
};

export { UnderwaterFloor };
