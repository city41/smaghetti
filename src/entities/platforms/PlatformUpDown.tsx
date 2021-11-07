import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { Resizer } from '../../components/Resizer';
import { PlatformSpeedButton, Speed } from './PlatformSpeedButton';
import { PlatformWidthButton } from './PlatformWidthButton';
import { Width, speedToValue, speedToRangeAdjustment } from './common';
import clamp from 'lodash/clamp';
import { parsePlatformSprite } from '../util';
import { IconArrowDown, IconArrowUp } from '../../icons';

const PlatformUpDown: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
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

	toSpriteBinary({ x, y, settings }) {
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

	parseSprite(data, offset) {
		return parsePlatformSprite(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 25%' };
		return (
			<div
				className="FallAwayPlatform-bg bg-center bg-no-repeat flex flex-col items-center justify-between"
				style={style}
			>
				<IconArrowUp />
				<IconArrowDown />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const width = (settings.width ?? this.defaultSettings!.width) as Width;
		const speed = (settings.speed ?? this.defaultSettings!.speed) as Speed;
		const range = (settings.range ?? this.defaultSettings!.range) as number;

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
			<div className="relative" style={style}>
				<div
					style={{
						top: TILE_SIZE / 2,
						height: `calc(100% - ${TILE_SIZE / 2}px`,
					}}
					className="absolute left-0 w-full opacity-20 bg-green-500 pointer-events-none"
				/>
				<div className="top-0 left-0 w-full z-10">{platform}</div>
				<div className="absolute left-0 bottom-0 opacity-25 pointer-events-none">
					{platform}
				</div>
				{!!entity && (
					<>
						<div
							style={{ top: TILE_SIZE * 0.5 + 1, width: TILE_SIZE }}
							className="absolute left-0 flex flex-row justify-around align-start z-10"
						>
							<PlatformSpeedButton
								currentSpeed={speed}
								onSpeedChange={(newSpeed) => {
									onSettingsChange({ speed: newSpeed });
								}}
							/>
							<PlatformWidthButton
								widths={[3, 4]}
								currentWidth={width}
								onWidthChange={(newWidth) => {
									onSettingsChange({ width: newWidth });
								}}
							/>
						</div>
						<Resizer
							className="absolute bottom-0 right-0 z-10"
							style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
							size={size}
							increment={{ x: 0, y: 1 }}
							axis="y"
							onSizeChange={(newSizePoint) => {
								onSettingsChange({
									range: clamp(newSizePoint.y, 8, 254),
								});
							}}
						/>
					</>
				)}
			</div>
		);
	},
};

export { PlatformUpDown };
