import React from 'react';
import clsx from 'clsx';
import { BiPlay, BiFastForward } from 'react-icons/bi';
import { GiStopSign } from 'react-icons/gi';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';
import _, { clamp } from 'lodash';
import { IconType } from 'react-icons/lib';

const speeds = ['stop', 'slow', 'fast'] as const;
type Speed = typeof speeds[number];
type Width = 3 | 4;

const speedToIcon: Record<Speed, IconType> = {
	stop: GiStopSign,
	slow: BiPlay,
	fast: BiFastForward,
};

const speedToValue: Record<Speed, number> = {
	stop: 0,
	slow: 0x10,
	fast: 0x1d,
};

const speedToRangeAdjustment: Record<Speed, number> = {
	stop: 1,
	slow: 1,
	fast: 0.75,
};

const PlatformUpDown: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Platform - Up Down',
		description: 'A platform that continually lowers and rises',
		warning:
			"The range you pick won't always match in-game. You may need to play with it a bit.",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0x1,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { width: 3, speed: 'slow', range: 0x10 },

	resources: {
		FloatingPlatformLeftEnd: {
			palettes: [
				[
					0x7f96,
					0x0,
					0x7fff,
					0x196,
					0x123b,
					0x1a9e,
					0x25fd,
					0x369e,
					0x475f,
					0x0,
					0x7f11,
					0x7f74,
					0x7fd8,
					0x31f,
					0x21f,
					0x1d,
				],
			],
			romOffset: 0x18af80,
			tiles: [[224, 225]],
		},
		FloatingPlatformCenter: {
			palettes: [
				[
					0x7f96,
					0x0,
					0x7fff,
					0x196,
					0x123b,
					0x1a9e,
					0x25fd,
					0x369e,
					0x475f,
					0x0,
					0x7f11,
					0x7f74,
					0x7fd8,
					0x31f,
					0x21f,
					0x1d,
				],
			],
			romOffset: 0x18af80,
			tiles: [[225, 225]],
		},
		FloatingPlatformRightEnd: {
			palettes: [
				[
					0x7f96,
					0x0,
					0x7fff,
					0x196,
					0x123b,
					0x1a9e,
					0x25fd,
					0x369e,
					0x475f,
					0x0,
					0x7f11,
					0x7f74,
					0x7fd8,
					0x31f,
					0x21f,
					0x1d,
				],
			],
			romOffset: 0x18af80,
			tiles: [[226, 227]],
		},
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		const range = (settings.range ?? this.defaultSettings!.range) as number;
		const width = (settings.width ?? this.defaultSettings!.width) as Width;
		const speed = (settings.speed ?? this.defaultSettings!.speed) as Speed;

		const widthAdjustment = width === 3 ? 0 : 0x80;

		return [
			1,
			this.objectId,
			x,
			y,
			speedToValue[speed] + widthAdjustment,
			Math.floor(range * speedToRangeAdjustment[speed]),
		];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 25%' };
		return (
			<div
				className="FallAwayPlatform-bg bg-center bg-no-repeat flex flex-col items-center justify-between"
				style={style}
			>
				<FaArrowUp />
				<FaArrowDown />
			</div>
		);
	},

	render(_showDetails, settings, onSettingsChange, entity) {
		const width = (settings.width ?? this.defaultSettings!.width) as Width;
		const speed = (settings.speed ?? this.defaultSettings!.speed) as Speed;
		const range = (settings.range ?? this.defaultSettings!.range) as number;

		const SpeedIcon = speedToIcon[speed];

		const size = { x: width, y: range };

		const pieceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE / 2,
		};

		const bodyPieces = [];

		for (let i = 0; i < width - 2; i += 1) {
			bodyPieces.push(
				<div
					key={i}
					className="FloatingPlatformCenter-bg bg-cover"
					style={pieceStyle}
				/>
			);
		}
		const platform = (
			<>
				<div className="flex flex-row">
					<div
						className="FloatingPlatformLeftEnd-bg bg-cover"
						style={pieceStyle}
					/>
					{bodyPieces}
					<div
						className="FloatingPlatformRightEnd-bg bg-cover"
						style={pieceStyle}
					/>
				</div>
			</>
		);

		const style = { width: TILE_SIZE * width, height: TILE_SIZE / 2 + range };
		return (
			<div
				className={clsx('relative', {
					[styles.resizing]: settings?.resizing,
				})}
				style={style}
			>
				{speed !== 'stop' && (
					<div
						style={{
							top: TILE_SIZE / 2,
							height: `calc(100% - ${TILE_SIZE / 2}px`,
						}}
						className="absolute left-0 w-full opacity-20 bg-green-500"
					/>
				)}
				<div className="top-0 left-0 w-full z-10">{platform}</div>
				{speed !== 'stop' && (
					<>
						<div className="absolute left-0 bottom-0 opacity-25">
							{platform}
						</div>
						<div
							className="absolute top-0 left-0"
							style={{ width: TILE_SIZE, height: TILE_SIZE }}
						></div>
					</>
				)}
				{!!entity && (
					<>
						<div
							style={{ top: 1 }}
							className="absolute left-0 w-full flex flex-row justify-center align-start z-10"
						>
							<button
								onMouseDown={(e) => {
									e.preventDefault();
									e.stopPropagation();

									const speedIndex = speeds.indexOf(speed);
									const newSpeedIndex = (speedIndex + 1) % speeds.length;
									const newSpeed = speeds[newSpeedIndex];
									onSettingsChange({
										speed: newSpeed,
									});
								}}
							>
								<SpeedIcon
									style={{ borderRadius: '10%', padding: 0.5 }}
									className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
								/>
							</button>
						</div>
						{speed !== 'stop' && (
							<Resizer
								className="absolute bottom-0 right-0 z-10"
								style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
								size={size}
								increment={{ x: TILE_SIZE, y: 1 }}
								axis="xy"
								onSizeChange={(newSizePoint) => {
									onSettingsChange({
										width: clamp(newSizePoint.x, 3, 4),
										range: Math.max(8, newSizePoint.y),
									});
								}}
								onResizeStart={() => onSettingsChange({ resizing: true })}
								onResizeEnd={() => onSettingsChange({ resizing: false })}
							/>
						)}
					</>
				)}
			</div>
		);
	},
};

export { PlatformUpDown };
