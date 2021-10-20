import React from 'react';
import type { Entity } from './types';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, parseObjectIdMapObject } from './util';
import clsx from 'clsx';
import { HammerButton } from './detailPanes/HammerButton';
import { TILE_SIZE } from '../tiles/constants';
import invert from 'lodash/invert';

const directions = ['right', 'up'] as const;
type Direction = typeof directions[number];

const directionToObjectId: Record<Direction, number> = {
	right: 0,
	up: 5,
};

const objectIdToDirection = invert(directionToObjectId) as Record<
	number,
	Direction
>;

const BoltHead: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Bolt Head',
		description: 'Holds airships together',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x0,
	alternateObjectIds: Object.values(directionToObjectId),
	emptyBank: 0,
	settingsType: 'single',
	defaultSettings: { direction: 'right' },

	resources: {
		BoltHeadRight: {
			romOffset: 0x176be8,
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x39ce,
					0x4a52,
					0x6318,
					0x77bd,
					0x267c,
					0x435f,
					0x5bbf,
					0x3d89,
					0x4a0d,
					0x5650,
					0x62b2,
					0x6f15,
					0x7778,
				],
			],
			tiles: [
				[655, 560],
				[671, 560],
			],
		},
		BoltHeadUp: {
			romOffset: 0x176be8,
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x39ce,
					0x4a52,
					0x6318,
					0x77bd,
					0x267c,
					0x435f,
					0x5bbf,
					0x3d89,
					0x4a0d,
					0x5650,
					0x62b2,
					0x6f15,
					0x7778,
				],
			],
			tiles: [
				[560, 560],
				[660, 661],
			],
		},
	},

	toObjectBinary({ x, y, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const objectId = directionToObjectId[direction];
		return [0, y, x, objectId];
	},

	parseObject(data, offset) {
		return parseObjectIdMapObject(
			data,
			offset,
			0,
			objectIdToDirection,
			'direction',
			this
		);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};
		return <div className="BoltHeadRight-bg bg-cover" style={style} />;
	},

	render({ settings, onSettingsChange, entity }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const style = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div
				style={style}
				className={clsx('bg-cover', {
					'BoltHeadRight-bg': direction === 'right',
					'BoltHeadUp-bg': direction === 'up',
				})}
			>
				{!!entity && (
					<HammerButton
						currentValue={direction}
						values={directions}
						onNewValue={(newDirection) => {
							onSettingsChange({ direction: newDirection });
						}}
					/>
				)}
			</div>
		);
	},
};

export { BoltHead };
