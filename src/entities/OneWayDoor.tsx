import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';
import { AngleEditDetails } from './detailPanes/AngleEditDetails';

const angleToDirection: Record<number, string> = {
	0: 'proceed-right',
	90: 'proceed-down',
	180: 'proceed-left',
	270: 'proceed-up',
};

const directionToAngle: Record<string, number> = (function () {
	return Object.entries(angleToDirection).reduce<Record<string, number>>(
		(building, entry) => {
			building[entry[1]] = Number(entry[0]);
			return building;
		},
		{}
	);
})();

const OneWayDoor: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'One Way Door',
	},

	objectId: 0xe5,
	alternateObjectIds: [0xe6],
	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	rotationGraphicSet: 0,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { direction: 'proceed-right' },

	resource: {
		romOffset: 0x18af80,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x3192,
				0x1636,
				0x2a9c,
				0x1f4,
				0x29a,
				0x37f,
				0x42ff,
				0x4a52,
				0x6318,
				0x77bd,
				0x7ffb,
				0x7fd2,
				0x732c,
			],
		],
		tiles: [
			[2, 3],
			[34, 35],
		],
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		switch (settings.direction) {
			case 'proceed-left': {
				return [0, 0xe5, x, y, 1];
			}
			case 'proceed-up': {
				return [0, 0xe6, x, y, 1];
			}
			case 'proceed-down': {
				return [0, 0xe6, x, y, 0];
			}
			case 'proceed-right':
			default: {
				return [0, 0xe5, x, y, 0];
			}
		}
	},

	simpleRender(size) {
		const singleFlipperStyle = {
			width: (size * 3) / 8,
			height: size / 2,
		};
		const containerStyle = {
			width: (size * 3) / 8,
			size,
			transform: 'scale(-1, 1)',
		};

		return (
			<div className="flex flex-col w-full h-full" style={containerStyle}>
				<div
					className="OneWayDoorVerticalFlipper-bg bg-cover"
					style={singleFlipperStyle}
				/>
				<div
					className="OneWayDoorVerticalFlipper-bg bg-cover"
					style={{
						...singleFlipperStyle,
						transform: 'scale(1, -1)',
					}}
				/>
			</div>
		);
	},

	render(_showDetails, settings, onSettingsChange) {
		const direction = settings.direction ?? this.defaultSettings!.direction;

		switch (direction) {
			case 'proceed-up':
			case 'proceed-down': {
				const singleFlipperStyle = {
					width: TILE_SIZE * 2,
					height: TILE_SIZE * 1.5,
					marginTop: direction === 'proceed-up' ? 7 : 0,
				};
				const containerStyle = {
					width: TILE_SIZE * 4,
					height: TILE_SIZE * 1.5,
					marginLeft: -TILE_SIZE * 1.5,
				};

				const containerTransformStyle =
					direction === 'proceed-up' ? { transform: 'scale(1, -1)' } : {};

				const body = (
					<div className="relative" style={containerStyle}>
						<div
							className={clsx('relative flex flex-row w-full h-full', {})}
							style={containerTransformStyle}
						>
							<div
								className="OneWayDoorHorizontalFlipper-bg"
								style={singleFlipperStyle}
							/>
							<div
								className="OneWayDoorHorizontalFlipper-bg"
								style={{
									...singleFlipperStyle,
									transform: 'scale(-1, 1)',
								}}
							/>
						</div>
						<div
							className="absolute"
							style={{
								width: TILE_SIZE,
								height: TILE_SIZE,
								left: TILE_SIZE * 1.5,
								top: 0,
							}}
						>
							<TileSpace />
						</div>
					</div>
				);

				return (
					<AngleEditDetails
						currentAngle={directionToAngle[direction]}
						width={TILE_SIZE}
						height={TILE_SIZE}
						onAngleChange={(newAngle) => {
							onSettingsChange({
								direction: angleToDirection[newAngle % 360],
							});
						}}
					>
						{body}
					</AngleEditDetails>
				);
			}
			case 'proceed-right':
			case 'proceed-left':
			default: {
				const singleFlipperStyle = {
					width: TILE_SIZE * 1.5,
					height: TILE_SIZE * 2,
					marginLeft: direction === 'proceed-left' ? -7 : 0,
				};
				const containerStyle = {
					width: TILE_SIZE * 1.5,
					height: TILE_SIZE * 4,
					marginTop: -TILE_SIZE * 1.5,
				};

				const containerTransformStyle =
					direction === 'proceed-right' ? { transform: 'scale(-1, 1)' } : {};

				const body = (
					<div className="relative" style={containerStyle}>
						<div
							className={clsx('relative flex flex-col w-full h-full', {})}
							style={containerTransformStyle}
						>
							<div
								className="OneWayDoorVerticalFlipper-bg"
								style={singleFlipperStyle}
							/>
							<div
								className="OneWayDoorVerticalFlipper-bg"
								style={{
									...singleFlipperStyle,
									transform: 'scale(1, -1)',
								}}
							/>
						</div>
						<div
							className="absolute"
							style={{
								width: TILE_SIZE,
								height: TILE_SIZE,
								top: TILE_SIZE * 1.5,
							}}
						>
							<TileSpace />
						</div>
					</div>
				);

				return (
					<AngleEditDetails
						currentAngle={directionToAngle[direction]}
						width={TILE_SIZE}
						height={TILE_SIZE * 4}
						onAngleChange={(newAngle) => {
							onSettingsChange({ direction: angleToDirection[newAngle] });
						}}
					>
						{body}
					</AngleEditDetails>
				);
			}
		}
	},
};

export { OneWayDoor };
