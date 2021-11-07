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
	['QuicksandTop-bg', 'QuicksandTop-bg', 'QuicksandTop-bg'],
	['QuicksandBody-bg', 'QuicksandBody-bg', 'QuicksandBody-bg'],
	['QuicksandBody-bg', 'QuicksandBody-bg', 'QuicksandBody-bg'],
];

const Quicksand: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Quicksand',
		description: 'Mario gets stuck in it, and must repeatedly jump to get out',
	},

	objectSets: encodeObjectSets([
		[14, 10],
		[14, 11],
		[14, 12],
		[14, 13],
		[14, 14],
		[14, 15],
		[14, 1],
		[14, 2],
		[14, 3],
		[14, 4],
		[14, 5],
		[14, 6],
		[14, 8],
		[14, 9],
		[3, 10],
		[3, 11],
		[3, 12],
		[3, 13],
		[3, 14],
		[3, 15],
		[3, 1],
		[3, 2],
		[3, 3],
		[3, 4],
		[3, 5],
		[3, 6],
		[3, 8],
		[3, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { width: 2, height: 1 },
	dimensions: 'none',
	objectId: 0x2a,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,

	resources: {
		QuicksandTop: {
			palettes: [
				[
					32662,
					32767,
					0,
					557,
					4721,
					9973,
					14201,
					26147,
					31534,
					32726,
					4402,
					6550,
					9787,
					11934,
					0,
					0,
				],
			],
			tiles: [
				[469, 469],
				[434, 434],
			],
			romOffset: 1534952,
		},
		QuicksandBody: {
			palettes: [
				[
					32662,
					32767,
					0,
					557,
					4721,
					9973,
					14201,
					26147,
					31534,
					32726,
					4402,
					6550,
					9787,
					11934,
					0,
					0,
				],
			],
			tiles: [
				[434, 434],
				[434, 434],
			],
			romOffset: 1534952,
		},
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
				className="QuicksandTop-bg bg-cover"
				style={{ width: size, height: size }}
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

export { Quicksand };
