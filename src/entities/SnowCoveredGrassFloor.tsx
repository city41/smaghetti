import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TILE_SIZE } from '../tiles/constants';
import { Resizer } from '../components/Resizer';
import clamp from 'lodash/clamp';

import styles from '../components/Resizer/ResizingStyles.module.css';

const SnowCoveredGrassFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-winter',
		title: 'Snow Covered Grass Floor',
	},

	objectSets: encodeObjectSets([
		[12, 12],
		[4, 12],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 2 },
	dimensions: 'none',
	objectId: 0x2,
	param1: 'height',
	param2: 'width',
	height: 2,
	emptyBank: 1,

	resources: {
		SnowCoveredGrassFloorLeft: {
			palettes: [
				[
					31744,
					32767,
					0,
					26019,
					31371,
					32622,
					32726,
					5524,
					11833,
					17085,
					13928,
					18121,
					24364,
					28592,
					32534,
					32697,
				],
				[
					31744,
					32767,
					0,
					379,
					6687,
					12959,
					19327,
					6648,
					11868,
					17151,
					12690,
					5686,
					10908,
					17151,
					32534,
					32697,
				],
			],
			tiles: [
				[534, 535],
				[550, 551],
				[
					{ tileIndex: 544, palette: 1 },
					{ tileIndex: 545, palette: 1 },
				],
				[
					{ tileIndex: 560, palette: 1 },
					{ tileIndex: 561, palette: 1 },
				],
			],
			romOffset: 1472116,
		},
		SnowCoveredGrassFloorCenter: {
			palettes: [
				[
					31744,
					32767,
					0,
					26019,
					31371,
					32622,
					32726,
					5524,
					11833,
					17085,
					13928,
					18121,
					24364,
					28592,
					32534,
					32697,
				],
				[
					31744,
					32767,
					0,
					379,
					6687,
					12959,
					19327,
					6648,
					11868,
					17151,
					12690,
					5686,
					10908,
					17151,
					32534,
					32697,
				],
			],
			tiles: [
				[538, 535],
				[554, 551],
				[
					{ tileIndex: 546, palette: 1 },
					{ tileIndex: 545, palette: 1 },
				],
				[
					{ tileIndex: 562, palette: 1 },
					{ tileIndex: 561, palette: 1 },
				],
			],
			romOffset: 1472116,
		},
		SnowCoveredGrassFloorRight: {
			palettes: [
				[
					31744,
					32767,
					0,
					26019,
					31371,
					32622,
					32726,
					5524,
					11833,
					17085,
					13928,
					18121,
					24364,
					28592,
					32534,
					32697,
				],
				[
					31744,
					32767,
					0,
					379,
					6687,
					12959,
					19327,
					6648,
					11868,
					17151,
					12690,
					5686,
					10908,
					17151,
					32534,
					32697,
				],
			],
			tiles: [
				[538, 539],
				[554, 555],
				[
					{
						tileIndex: 546,
						palette: 1,
					},
					{
						tileIndex: 514,
						palette: 1,
					},
				],
				[
					{
						tileIndex: 562,
						palette: 1,
					},
					{
						tileIndex: 530,
						palette: 1,
					},
				],
			],
			romOffset: 1472116,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	simpleRender(size) {
		const style = { width: size, height: size };

		const leftStyle = {
			width: size / 2,
			height: size,
		};

		const rightStyle = {
			width: size / 2,
			height: size,
		};

		return (
			<div className="flex flex-row items-center" style={style}>
				<div
					style={leftStyle}
					className="SnowCoveredGrassFloorLeft-bg bg-cover"
				/>
				<div
					style={rightStyle}
					className="SnowCoveredGrassFloorRight-bg bg-cover"
				/>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const style = {
			width: width * TILE_SIZE,
			height: 2 * TILE_SIZE,
		};

		const sideStyle = {
			width: TILE_SIZE,
			height: 2 * TILE_SIZE,
		};

		const centerStyle = {
			width: Math.max(0, width - 2) * TILE_SIZE,
			height: 2 * TILE_SIZE,
		};

		return (
			<div
				style={style}
				className={clsx('relative flex flex-row', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				<div style={sideStyle} className="SnowCoveredGrassFloorLeft-bg" />
				<div
					style={centerStyle}
					className="SnowCoveredGrassFloorCenter-bg bg-repeat-x"
				/>
				<div
					style={{ ...sideStyle, backgroundPositionX: 'right' }}
					className="SnowCoveredGrassFloorRight-bg"
				/>
				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={{ x: width, y: 1 }}
						increment={TILE_SIZE}
						axis="x"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ width: clamp(newSizePoint.x, 2, 64) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { SnowCoveredGrassFloor };
