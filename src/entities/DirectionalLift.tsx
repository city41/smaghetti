import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets, parseSimpleObject } from './util';
import { HammerButton } from './detailPanes/HammerButton';

const directions = ['up', 'right', 'left', 'exclamation'] as const;
type Direction = typeof directions[number];

const directionToObjectId: Record<Direction, number> = {
	up: 0x4,
	right: 0x5,
	left: 0x6,
	exclamation: 0x7,
};

const directionToClass: Record<Direction, string> = {
	up: 'DirectionalLiftUp-bg',
	right: 'DirectionalLiftRight-bg',
	left: 'DirectionalLiftLeft-bg',
	exclamation: 'DirectionalLiftExclamation-bg',
};

const DirectionalLift: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Directional Lift',
		warning:
			'Will only be active in a wrap-around room. In a regular room, it is just a static platform.',
	},

	objectSets: encodeObjectSets([
		[6, 5],
		[6, 6],
		[6, 8],
		[8, 5],
		[8, 6],
		[8, 8],
	]),
	alternateObjectIds: Object.values(directionToObjectId),
	spriteGraphicSets: [0xa, -1, -1, -1, -1, -1],
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x7,
	emptyBank: 0,
	height: 1,
	width: 2,
	defaultSettings: {
		direction: 'up',
	},

	resources: {
		DirectionalLiftUp: {
			palettes: [
				[
					32662,
					32767,
					6342,
					17932,
					23185,
					28469,
					32731,
					23247,
					25361,
					28531,
					16736,
					19936,
					24128,
					28352,
					0,
					0,
				],
			],
			tiles: [
				[580, 581, 582, 583],
				[596, 597, 598, 599],
			],
			romOffset: 1550484,
		},
		DirectionalLiftRight: {
			palettes: [
				[
					32662,
					32767,
					6342,
					17932,
					23185,
					28469,
					32731,
					23247,
					25361,
					28531,
					16736,
					19936,
					24128,
					28352,
					0,
					0,
				],
			],
			tiles: [
				[580, 632, 633, 583],
				[596, 634, 635, 599],
			],
			romOffset: 1550484,
		},
		DirectionalLiftLeft: {
			palettes: [
				[
					32662,
					32767,
					6342,
					17932,
					23185,
					28469,
					32731,
					23247,
					25361,
					28531,
					16736,
					19936,
					24128,
					28352,
					0,
					0,
				],
			],
			tiles: [
				[580, 544, 545, 583],
				[596, 546, 547, 599],
			],
			romOffset: 1550484,
		},
		DirectionalLiftExclamation: {
			palettes: [
				[
					32662,
					32767,
					6342,
					17932,
					23185,
					28469,
					32731,
					23247,
					25361,
					28531,
					16736,
					19936,
					24128,
					28352,
					0,
					0,
				],
			],
			tiles: [
				[580, 560, 561, 583],
				[596, 562, 563, 599],
			],
			romOffset: 1550484,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const objectId = directionToObjectId[direction];

		return [0, y, x, objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="DirectionalLiftUp-bg bg-cover"
				style={{ width: size, height: size / 2 }}
			/>
		);
	},

	render({ entity, settings, onSettingsChange }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE,
		};

		return (
			<div className={directionToClass[direction]} style={style}>
				{!!entity && (
					<div
						className="relative"
						style={{ width: TILE_SIZE, height: TILE_SIZE }}
					>
						<HammerButton
							currentValue={direction}
							values={directions}
							onNewValue={(newDirection) => {
								onSettingsChange({
									direction: newDirection,
								});
							}}
						/>
					</div>
				)}
			</div>
		);
	},
};

export { DirectionalLift };
