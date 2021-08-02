import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';
import { PlatformSpeedButton, Speed } from './detailPanes/PlatformSpeedButton';
import { PlatformWidthButton } from './detailPanes/PlatformWidthButton';
import clamp from 'lodash/clamp';

type Width = 3 | 4;

const speedToValue: Record<Speed, number> = {
	slow: 0x10,
	fast: 0x1d,
};

const speedToRangeAdjustment: Record<Speed, number> = {
	slow: 1,
	fast: 0.75,
};

const PlatformLeftRight: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Platform - Left Right',
		description: 'A platform that continually goes left then right',
		warning:
			"The range you pick won't always match in-game. You may need to play with it a bit.",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0x2,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { width: 3, speed: 'slow', range: 0x10 },

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
				className="FallAwayPlatform-bg bg-center bg-no-repeat flex flex-row items-start justify-center"
				style={style}
			>
				<FaArrowLeft />
				<FaArrowRight />
			</div>
		);
	},

	render(_showDetails, settings, onSettingsChange, entity) {
		const width = (settings.width ?? this.defaultSettings!.width) as Width;
		const speed = (settings.speed ?? this.defaultSettings!.speed) as Speed;
		const range = (settings.range ?? this.defaultSettings!.range) as number;

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
				<div className="flex flex-row justify-start">
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

		const style = { width: TILE_SIZE * width + range, height: TILE_SIZE / 2 };

		return (
			<div className="relative" style={style}>
				<div
					style={{
						height: TILE_SIZE / 2,
						width: '100%',
					}}
					className="absolute top-0 left-0 w-full opacity-20 bg-green-500 pointer-events-none"
				/>
				<div className="top-0 left-0 w-full z-10">{platform}</div>
				<div className="absolute right-0 top-0 opacity-25 pointer-events-none">
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
							size={{ x: range, y: 1 }}
							increment={{ x: 1, y: 0 }}
							axis="x"
							onSizeChange={(newSizePoint) => {
								onSettingsChange({
									range: clamp(newSizePoint.x, 8, 254),
								});
							}}
						/>
					</>
				)}
			</div>
		);
	},
};

export { PlatformLeftRight };
