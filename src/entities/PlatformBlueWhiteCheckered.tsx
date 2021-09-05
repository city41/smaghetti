import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';

const PlatformBlueWhiteCheckered: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Platform - Blue/White Checkered',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 2 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x58,
	emptyBank: 1,
	height: 1,

	resources: {
		PlatformBlueWhiteCheckeredLeft: {
			palettes: [
				[
					31744,
					32767,
					0,
					30249,
					32560,
					32722,
					32763,
					11833,
					17085,
					21343,
					14088,
					16237,
					19409,
					23540,
					14047,
					27640,
				],
			],
			tiles: [[32, 14]],
			romOffset: 2155760,
		},
		PlatformBlueWhiteCheckeredCenter: {
			palettes: [
				[
					31744,
					32767,
					0,
					30249,
					32560,
					32722,
					32763,
					11833,
					17085,
					21343,
					14088,
					16237,
					19409,
					23540,
					14047,
					27640,
				],
			],
			tiles: [[14, 14]],
			romOffset: 2155760,
		},
		PlatformBlueWhiteCheckeredRight: {
			palettes: [
				[
					31744,
					32767,
					0,
					30249,
					32560,
					32722,
					32763,
					11833,
					17085,
					21343,
					14088,
					16237,
					19409,
					23540,
					14047,
					27640,
				],
			],
			tiles: [[14, 49]],
			romOffset: 2155760,
		},
		PlatformBlueWhiteCheckeredSingle: {
			palettes: [
				[
					31744,
					32767,
					0,
					30249,
					32560,
					32722,
					32763,
					11833,
					17085,
					21343,
					14088,
					16237,
					19409,
					23540,
					14047,
					27640,
				],
			],
			tiles: [[32, 49]],
			romOffset: 2155760,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const width = settings.width ?? this.defaultSettings!.width;

		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 50%' };

		return (
			<div
				style={style}
				className="PlatformBlueWhiteCheckeredSingle-bg bg-no-repeat"
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const style = {
			height: TILE_SIZE / 2,
			width: width * TILE_SIZE,
		};

		const capStyle = {
			height: TILE_SIZE / 2,
			width: TILE_SIZE,
		};

		const size = { x: width, y: 1 };

		const bodyStyle = {
			height: TILE_SIZE / 2,
			width: (width - 2) * TILE_SIZE,
		};

		const platform =
			width === 1 ? (
				<div className="PlatformBlueWhiteCheckeredSingle-bg" style={capStyle} />
			) : (
				<>
					<div className="PlatformBlueWhiteCheckeredLeft-bg" style={capStyle} />
					<div
						className="PlatformBlueWhiteCheckeredCenter-bg"
						style={bodyStyle}
					/>
					<div
						className="PlatformBlueWhiteCheckeredRight-bg"
						style={capStyle}
					/>
				</>
			);

		return (
			<div
				style={style}
				className={clsx('relative flex flex-row', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				{platform}
				{entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE}
						axis="x"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ width: Math.max(1, newSizePoint.x) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { PlatformBlueWhiteCheckered };
