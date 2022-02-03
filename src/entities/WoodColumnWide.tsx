import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, getBankParam1 } from './util';
import { Resizer } from '../components/Resizer';
import clamp from 'lodash/clamp';

import styles from '../components/Resizer/ResizingStyles.module.css';

const WoodColumnWide: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-bowsers-army',
		title: 'Wood Column - Wide',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x5,
	emptyBank: 1,
	width: 2,
	defaultSettings: {
		width: 2,
		height: 2,
	},

	resources: {
		WoodColumnWideTop: {
			palettes: [
				[
					32662,
					32767,
					0,
					17932,
					23185,
					28469,
					32731,
					8378,
					8606,
					15007,
					304,
					435,
					6711,
					11931,
					16158,
					19359,
				],
			],
			tiles: [
				[266, 267, 268, 269],
				[298, 299, 300, 301],
			],
			romOffset: 1501760,
		},
		WoodColumnWideBody: {
			palettes: [
				[
					32662,
					32767,
					0,
					17932,
					23185,
					28469,
					32731,
					8378,
					8606,
					15007,
					304,
					435,
					6711,
					11931,
					16158,
					19359,
				],
			],
			tiles: [
				[282, 283, 284, 285],
				[298, 299, 300, 301],
				[314, 315, 316, 317],
				[270, 271, 302, 303],
			],
			romOffset: 1501760,
		},
		WoodColumnWideBottom: {
			palettes: [
				[
					32662,
					32767,
					0,
					17932,
					23185,
					28469,
					32731,
					8378,
					8606,
					15007,
					304,
					435,
					6711,
					11931,
					16158,
					19359,
				],
			],
			tiles: [
				[314, 315, 316, 317],
				[286, 287, 318, 319],
			],
			romOffset: 1501760,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		// param1 = 0 -> auto grows to bottom of level, like a plateau
		// param1 > 0 -> height of <param+1>
		// param2 -> width in tiles, including half widths, so
		// 3 would render 1.5 wood columns
		return [getBankParam1(1, height - 1), y, x, this.objectId, width];
	},

	// parseObject(data, offset) {
	// 	return parseCellObjectsParam1Width(data, offset, this);
	// },

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};

		const topAndBottomStyle = {
			width: size,
			height: size / 2,
		};

		return (
			<div className="flex flex-col items-center" style={style}>
				<div
					className="WoodColumnWideTop-bg bg-cover"
					style={topAndBottomStyle}
				/>
				<div
					className="WoodColumnWideBottom-bg bg-cover"
					style={topAndBottomStyle}
				/>
			</div>
		);
	},

	render({ entity, settings, onSettingsChange }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const style = {
			width: width * TILE_SIZE,
			height: height * TILE_SIZE,
		};

		const topStyle = {
			height: TILE_SIZE,
		};

		const bottomStyle = {
			height: TILE_SIZE,
		};

		const bodyStyle = {
			height: (height - 2) * TILE_SIZE,
		};

		const size = { x: width, y: height };

		return (
			<div
				style={style}
				className={clsx('relative flex flex-col', {
					[styles.resizing]: settings.resizing,
				})}
			>
				<div
					className="WoodColumnWideTop-bg bg-repeat-x w-full"
					style={topStyle}
				/>
				<div
					className="WoodColumnWideBody-bg bg-repeat w-full"
					style={bodyStyle}
				/>
				<div
					className="WoodColumnWideBottom-bg bg-repeat-x w-full"
					style={bottomStyle}
				/>
				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE}
						axis="xy"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({
								width: clamp(newSizePoint.x, 2, 32),
								height: clamp(newSizePoint.y, 2, 32),
							});
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { WoodColumnWide };
