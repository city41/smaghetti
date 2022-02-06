import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';
import { IconArrowLeft } from '../icons';
import { PlatformSpeedButton } from './platforms/PlatformSpeedButton';

const speeds = ['slow', 'fast'] as const;
type Speed = typeof speeds[number];

const speedToObjectId: Record<Speed, number> = {
	slow: 0x2c,
	fast: 0x24,
};

const CloudPlatformAeroMoving: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-sky',
		title: 'Cloud Platform - Aero, Moving',
		description: 'Slowly moves to the left',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [5, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x24,
	alternateObjectIds: Object.values(speedToObjectId),
	width: 3,
	height: 1,
	defaultSettings: { speed: 'slow' },

	resource: {
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
		romOffset: 0x163768,
		tiles: [
			[896, 897, 897, 897, 898, 899],
			[912, 913, 913, 913, 914, 915],
		],
	},

	toSpriteBinary({ x, y, settings }) {
		const speed = (settings.speed ?? this.defaultSettings?.speed) as Speed;
		const objectId = speedToObjectId[speed];

		return [0, objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size / 3 };

		return (
			<div
				className="flex flex-col items-center justify-start"
				style={{ width: size, height: size }}
			>
				<div className="flex flex-row items-center justify-center">
					<IconArrowLeft />
				</div>
				<div className="CloudPlatformAeroMoving-bg bg-cover" style={style} />
			</div>
		);
	},

	render({ entity, settings, onSettingsChange }) {
		const speed = (settings.speed ?? this.defaultSettings?.speed) as Speed;

		const style = { width: TILE_SIZE * 3, height: TILE_SIZE };
		return (
			<div
				className="relative CloudPlatformAeroMoving-bg bg-cover"
				style={style}
			>
				{!!entity && (
					<div className="absolute inset-0 grid place-items-center transform rotate-180">
						<PlatformSpeedButton
							currentSpeed={speed}
							onSpeedChange={(newSpeed) => {
								onSettingsChange({ speed: newSpeed });
							}}
						/>
					</div>
				)}
			</div>
		);
	},
};

export { CloudPlatformAeroMoving };
