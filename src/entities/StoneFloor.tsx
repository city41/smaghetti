import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { ResizableRect } from '../components/ResizableRect';

const RECT_CLASSES = [
	['StoneFloorUpperLeft-bg', 'StoneFloorTop-bg', 'StoneFloorUpperRight-bg'],
	['StoneFloorLeft-bg', 'StoneFloor-bg', 'StoneFloorRight-bg'],
	['StoneFloorLowerLeft-bg', 'StoneFloorBottom-bg', 'StoneFloorLowerRight-bg'],
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
	settingsType: 'single',
	defaultSettings: { width: 2, height: 2 },

	resource: {
		palettes: [
			[
				32662,
				32767,
				0,
				25101,
				29297,
				31509,
				32699,
				11445,
				17819,
				22078,
				13805,
				18033,
				23318,
				27546,
				27327,
				31583,
			],
		],
		tiles: [
			[119, 119],
			[119, 119],
		],
		romOffset: 1501760,
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
				<div style={cornerStyle} className="StoneFloorUpperLeft-bg bg-cover" />
				<div style={cornerStyle} className="StoneFloorUpperRight-bg bg-cover" />
				<div style={cornerStyle} className="StoneFloorLowerLeft-bg bg-cover" />
				<div style={cornerStyle} className="StoneFloorLowerRight-bg bg-cover" />
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
				minW={2}
				minH={1}
				classes={RECT_CLASSES}
				hideResizer={!entity}
				onSizeChange={(width, height) => onSettingsChange({ width, height })}
			/>
		);
	},
};

export { StoneFloor };
