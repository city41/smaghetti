import React from 'react';
import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1WidthParam2HeightEntityObject,
} from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { ResizableRect } from '../components/ResizableRect';

const RECT_CLASSES = [
	[
		'AirshipCrateUpperLeft-bg',
		'AirshipCrateTop-bg',
		'AirshipCrateUpperRight-bg',
	],
	['AirshipCrateLeft-bg', 'AirshipCrateCenter-bg', 'AirshipCrateRight-bg'],
	[
		'AirshipCrateLowerLeft-bg',
		'AirshipCrateBottom-bg',
		'AirshipCrateLowerRight-bg',
	],
];

const AirshipCrate: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-bowsers-army',
		title: 'Airship Crate',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	param1: 'width',
	param2: 'height',
	objectId: 0x31,
	emptyBank: 1,

	defaultSettings: { width: 2, height: 4 },

	resources: {
		AirshipCrateUpperLeft: {
			palettes: [
				[
					32662,
					32767,
					0,
					5586,
					8791,
					11004,
					14270,
					5668,
					11910,
					17229,
					12690,
					5686,
					10908,
					17151,
					5521,
					9786,
				],
			],
			tiles: [
				[640, 649],
				[697, 680],
			],
			romOffset: 1534952,
		},
		AirshipCrateTop: {
			palettes: [
				[
					32662,
					32767,
					0,
					5586,
					8791,
					11004,
					14270,
					5668,
					11910,
					17229,
					12690,
					5686,
					10908,
					17151,
					5521,
					9786,
				],
			],
			tiles: [
				[649, 649],
				[680, 680],
			],
			romOffset: 1534952,
		},
		AirshipCrateUpperRight: {
			palettes: [
				[
					32662,
					32767,
					0,
					5586,
					8791,
					11004,
					14270,
					5668,
					11910,
					17229,
					12690,
					5686,
					10908,
					17151,
					5521,
					9786,
				],
			],
			tiles: [
				[649, 641],
				[680, 697],
			],
			romOffset: 1534952,
		},
		AirshipCrateLeft: {
			palettes: [
				[
					32662,
					32767,
					0,
					5586,
					8791,
					11004,
					14270,
					5668,
					11910,
					17229,
					12690,
					5686,
					10908,
					17151,
					5521,
					9786,
				],
			],
			tiles: [
				[697, 680],
				[697, 680],
			],
			romOffset: 1534952,
		},
		AirshipCrateCenter: {
			palettes: [
				[
					32662,
					32767,
					0,
					5586,
					8791,
					11004,
					14270,
					5668,
					11910,
					17229,
					12690,
					5686,
					10908,
					17151,
					5521,
					9786,
				],
			],
			tiles: [
				[680, 680],
				[680, 680],
			],
			romOffset: 1534952,
		},
		AirshipCrateRight: {
			palettes: [
				[
					32662,
					32767,
					0,
					5586,
					8791,
					11004,
					14270,
					5668,
					11910,
					17229,
					12690,
					5686,
					10908,
					17151,
					5521,
					9786,
				],
			],
			tiles: [
				[680, 697],
				[680, 697],
			],
			romOffset: 1534952,
		},
		AirshipCrateLowerLeft: {
			palettes: [
				[
					32662,
					32767,
					0,
					5586,
					8791,
					11004,
					14270,
					5668,
					11910,
					17229,
					12690,
					5686,
					10908,
					17151,
					5521,
					9786,
				],
			],
			tiles: [
				[697, 680],
				[656, 649],
			],
			romOffset: 1534952,
		},
		AirshipCrateBottom: {
			palettes: [
				[
					32662,
					32767,
					0,
					5586,
					8791,
					11004,
					14270,
					5668,
					11910,
					17229,
					12690,
					5686,
					10908,
					17151,
					5521,
					9786,
				],
			],
			tiles: [
				[680, 680],
				[649, 649],
			],
			romOffset: 1534952,
		},
		AirshipCrateLowerRight: {
			palettes: [
				[
					32662,
					32767,
					0,
					5586,
					8791,
					11004,
					14270,
					5668,
					11910,
					17229,
					12690,
					5686,
					10908,
					17151,
					5521,
					9786,
				],
			],
			tiles: [
				[680, 697],
				[649, 657],
			],
			romOffset: 1534952,
		},
	},

	toObjectBinary({ x, y, settings }): number[] {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		return [getBankParam1(1, width - 1), y, x, this.objectId, height - 1];
	},

	parseObject(data, offset) {
		return parseParam1WidthParam2HeightEntityObject(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size };

		const cornerStyle = { width: size / 2, height: size / 2 };

		return (
			<div style={style} className="grid grid-cols-2 grid-rows-2">
				<div
					style={cornerStyle}
					className="AirshipCrateUpperLeft-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="AirshipCrateUpperRight-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="AirshipCrateLowerLeft-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="AirshipCrateLowerRight-bg bg-cover"
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
				styles={RECT_CLASSES}
				hideResizer={!entity}
				minW={2}
				minH={4}
				onSizeChange={(width, height) => onSettingsChange({ width, height })}
			/>
		);
	},
};

export { AirshipCrate };
