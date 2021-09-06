import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1WidthEntityObject,
} from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TILE_SIZE } from '../tiles/constants';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';

const WoodPlatformGiant: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-giant',
		title: 'Wood Platform - Giant',
	},

	objectSets: encodeObjectSets([
		[12, 4],
		[4, 4],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 2 },
	dimensions: 'none',
	objectId: 0x1,
	param1: 'width',
	height: 2,
	emptyBank: 1,

	resources: {
		WoodPlatformGiantLeft: {
			romOffset: 0x163768,
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
				[768, 769],
				[784, 785],
				[800, 801],
				[816, 817],
			],
		},
		WoodPlatformGiantCenter: {
			romOffset: 0x163768,
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
				[769, 769],
				[785, 785],
				[801, 801],
				[817, 817],
			],
		},
		WoodPlatformGiantRight: {
			romOffset: 0x163768,
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
				[769, 770],
				[785, 786],
				[801, 802],
				[817, 818],
			],
		},
	},

	toObjectBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseParam1WidthEntityObject(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const cellStyle = { width: size / 2, height: size };

		return (
			<div className="flex flex-row" style={style}>
				<div className="WoodPlatformGiantLeft-bg bg-cover" style={cellStyle} />
				<div className="WoodPlatformGiantRight-bg bg-cover" style={cellStyle} />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const style = {
			width: width * TILE_SIZE,
			height: 2 * TILE_SIZE,
		};

		const capStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
		};

		const bodyStyle = {
			width: (width - 2) * TILE_SIZE,
			height: TILE_SIZE * 2,
		};

		return (
			<div
				style={style}
				className={clsx('relative flex flex-row', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				<div className="WoodPlatformGiantLeft-bg bg-cover" style={capStyle} />
				<div
					className="WoodPlatformGiantCenter-bg bg-repeat-x"
					style={bodyStyle}
				/>
				<div className="WoodPlatformGiantRight-bg bg-cover" style={capStyle} />
				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={{ x: width, y: 1 }}
						increment={TILE_SIZE}
						axis="x"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ width: Math.max(2, newSizePoint.x) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { WoodPlatformGiant };
