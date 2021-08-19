import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { ResizableRect } from '../components/ResizableRect';

const RECT_CLASSES = [
	[
		'AirshipMetalPanelUpperLeft-bg',
		'AirshipMetalPanelTop-bg',
		'AirshipMetalPanelUpperRight-bg',
	],
	[
		'AirshipMetalPanelLeft-bg',
		'AirshipMetalPanelCenter-bg',
		'AirshipMetalPanelRight-bg',
	],
	[
		'AirshipMetalPanelLowerLeft-bg',
		'AirshipMetalPanelBottom-bg',
		'AirshipMetalPanelLowerRight-bg',
	],
];

const AirshipMetalPanel: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-airship',
		title: 'Airship MetalPanel',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	param1: 'height',
	param2: 'width',
	objectId: 0x30,
	emptyBank: 1,
	settingsType: 'single',
	defaultSettings: { width: 3, height: 3 },

	resources: {
		AirshipMetalPanelUpperLeft: {
			palettes: [
				[
					32662,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					9852,
					17247,
					23487,
					15753,
					18957,
					22096,
					25266,
					28437,
					30584,
				],
			],
			tiles: [
				[716, 718],
				[717, 719],
			],
			romOffset: 1534952,
		},
		AirshipMetalPanelTop: {
			palettes: [
				[
					32662,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					9852,
					17247,
					23487,
					15753,
					18957,
					22096,
					25266,
					28437,
					30584,
				],
			],
			tiles: [
				[718, 718],
				[
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
				],
			],
			romOffset: 1534952,
		},
		AirshipMetalPanelUpperRight: {
			palettes: [
				[
					32662,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					9852,
					17247,
					23487,
					15753,
					18957,
					22096,
					25266,
					28437,
					30584,
				],
			],
			tiles: [
				[718, 683],
				[719, 685],
			],
			romOffset: 1534952,
		},
		AirshipMetalPanelLeft: {
			palettes: [
				[
					32662,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					9852,
					17247,
					23487,
					15753,
					18957,
					22096,
					25266,
					28437,
					30584,
				],
			],
			tiles: [
				[
					717,
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
				],
				[
					717,
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
				],
			],
			romOffset: 1534952,
		},
		AirshipMetalPanelCenter: {
			palettes: [
				[
					32662,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					9852,
					17247,
					23487,
					15753,
					18957,
					22096,
					25266,
					28437,
					30584,
				],
			],
			tiles: [
				[
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
				],
				[
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
				],
			],
			romOffset: 1534952,
		},
		AirshipMetalPanelRight: {
			palettes: [
				[
					32662,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					9852,
					17247,
					23487,
					15753,
					18957,
					22096,
					25266,
					28437,
					30584,
				],
			],
			tiles: [
				[
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
					685,
				],
				[
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
					685,
				],
			],
			romOffset: 1534952,
		},
		AirshipMetalPanelLowerLeft: {
			palettes: [
				[
					32662,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					9852,
					17247,
					23487,
					15753,
					18957,
					22096,
					25266,
					28437,
					30584,
				],
			],
			tiles: [
				[717, 719],
				[
					698,
					{
						romOffset: 1486172,
						tileIndex: 885,
					},
				],
			],
			romOffset: 1534952,
		},
		AirshipMetalPanelBottom: {
			palettes: [
				[
					32662,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					9852,
					17247,
					23487,
					15753,
					18957,
					22096,
					25266,
					28437,
					30584,
				],
			],
			tiles: [
				[
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
					{
						romOffset: 1253344,
						tileIndex: 262,
					},
				],
				[
					{
						romOffset: 1486172,
						tileIndex: 885,
					},
					{
						romOffset: 1486172,
						tileIndex: 885,
					},
				],
			],
			romOffset: 1534952,
		},
		AirshipMetalPanelLowerRight: {
			palettes: [
				[
					32662,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					9852,
					17247,
					23487,
					15753,
					18957,
					22096,
					25266,
					28437,
					30584,
				],
			],
			tiles: [
				[719, 685],
				[
					{
						romOffset: 1486172,
						tileIndex: 885,
					},
					699,
				],
			],
			romOffset: 1534952,
		},
	},

	toObjectBinary({ x, y, settings }): number[] {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		return [getBankParam1(1, height - 1), y, x, this.objectId, width - 1];
	},

	simpleRender(size) {
		const style = { width: size, height: size };

		const cellStyle = { width: size / 3, height: size / 3 };

		return (
			<div style={style} className="grid grid-cols-3 grid-rows-3">
				<div
					style={cellStyle}
					className="AirshipMetalPanelUpperLeft-bg bg-cover"
				/>
				<div style={cellStyle} className="AirshipMetalPanelTop-bg bg-cover" />
				<div
					style={cellStyle}
					className="AirshipMetalPanelUpperRight-bg bg-cover"
				/>
				<div style={cellStyle} className="AirshipMetalPanelLeft-bg bg-cover" />
				<div
					style={cellStyle}
					className="AirshipMetalPanelCenter-bg bg-cover"
				/>
				<div style={cellStyle} className="AirshipMetalPanelRight-bg bg-cover" />
				<div
					style={cellStyle}
					className="AirshipMetalPanelLowerLeft-bg bg-cover"
				/>
				<div
					style={cellStyle}
					className="AirshipMetalPanelBottom-bg bg-cover"
				/>
				<div
					style={cellStyle}
					className="AirshipMetalPanelLowerRight-bg bg-cover"
				/>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		return (
			<ResizableRect
				className="relative"
				width={width}
				height={height}
				classes={RECT_CLASSES}
				hideResizer={!entity}
				minW={2}
				minH={2}
				onSizeChange={(width, height) => onSettingsChange({ width, height })}
			/>
		);
	},
};

export { AirshipMetalPanel };
