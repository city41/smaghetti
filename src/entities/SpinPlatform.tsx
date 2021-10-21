import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';
import { HammerButton } from './detailPanes/HammerButton';
import { parseObjectIdMapSprite } from './util';
import invert from 'lodash/invert';
import {
	IconCounterClockwiseRotation,
	IconClockwiseRotation,
	IconRotateLeftWithPause,
	IconRotateRightWithPause,
} from '../icons';
import type { IconType } from '../icons';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const spins = [
	'clockwise',
	'clockwise-pause',
	'counterclockwise',
	'counterclockwise-pause',
] as const;
type Spin = typeof spins[number];

const spinToObjectId: Record<Spin, number> = {
	clockwise: 0x91,
	'clockwise-pause': 0x92,
	counterclockwise: 0xfb,
	'counterclockwise-pause': 0x93,
};

const objectIdToSpin = invert(spinToObjectId) as Record<number, Spin>;

const spinToIcon: Record<Spin, IconType> = {
	clockwise: IconClockwiseRotation,
	'clockwise-pause': IconRotateRightWithPause,
	counterclockwise: IconCounterClockwiseRotation,
	'counterclockwise-pause': IconRotateLeftWithPause,
};

const SpinPlatform: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Spin Platform',
		description: 'You spin me right round',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, -1],
	objectId: 0x91,
	alternateObjectIds: Object.values(spinToObjectId),
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: {
		spin: 'clockwise',
	},

	toSpriteBinary({ x, y, settings }) {
		const spin = (settings.spin ?? this.defaultSettings!.spin) as Spin;
		const objectId = spinToObjectId[spin];

		return [0, objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseObjectIdMapSprite(
			data,
			offset,
			0,
			objectIdToSpin,
			'spin',
			this
		);
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const ballStyle = {
			width: size / 5,
			height: (size / 5) * 2,
		};
		return (
			<div className="relative flex flex-row items-center" style={style}>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformPivot-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div className="absolute bottom-0 left-0 w-full text-center bg-black text-white text-xs">
					spin
				</div>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const spin = (settings.spin ?? this.defaultSettings!.spin) as Spin;
		const style = {
			width: TILE_SIZE * 3.5,
			height: TILE_SIZE / 2,
			marginLeft: -1.25 * TILE_SIZE,
			marginTop: -0.75 * TILE_SIZE,
		};

		const ballStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE,
		};

		return (
			<>
				<div className="flex flex-row" style={style}>
					<div
						className="TiltPlatformBall-bg bg-cover bg-no-repeat"
						style={ballStyle}
					/>
					<div
						className="TiltPlatformBall-bg bg-cover bg-no-repeat"
						style={ballStyle}
					/>
					<div
						className="TiltPlatformBall-bg bg-cover bg-no-repeat"
						style={ballStyle}
					/>
					<div
						className="TiltPlatformPivot-bg bg-cover bg-no-repeat"
						style={ballStyle}
					/>
					<div
						className="TiltPlatformBall-bg bg-cover bg-no-repeat"
						style={ballStyle}
					/>
					<div
						className="TiltPlatformBall-bg bg-cover bg-no-repeat"
						style={ballStyle}
					/>
					<div
						className="TiltPlatformBall-bg bg-cover bg-no-repeat"
						style={ballStyle}
					/>
				</div>
				<TileSpace
					className="absolute top-0 left-0"
					style={{ width: TILE_SIZE, height: TILE_SIZE }}
				/>
				{!!entity && (
					<HammerButton
						style={{ width: TILE_SIZE, height: TILE_SIZE }}
						values={spins}
						currentValue={spin}
						valueToIcon={spinToIcon}
						onNewValue={(newSpin) => {
							onSettingsChange({ spin: newSpin });
						}}
					/>
				)}
			</>
		);
	},
};

export { SpinPlatform };
