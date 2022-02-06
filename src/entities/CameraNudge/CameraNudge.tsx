import React from 'react';
import clsx from 'clsx';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { IconArrowUp, IconArrowDown, IconMovieCamera } from '../../icons';
import invert from 'lodash/invert';
import { parseSimpleSpriteObjectIdOverride } from '../util';
import { Resizer } from '../../components/Resizer';
import clamp from 'lodash/clamp';

import styles from './CameraNudge.module.css';

type Direction = 'up' | 'down';

const directionToObjectId: Record<Direction, number> = {
	up: 0xca,
	down: 0xcb,
};

// these are also camera nudge sprites, and so far they seem
// to behave identically, so Smaghetti treats them the same when parsing
const alternateDirectionToObjectId: Record<Direction, number> = {
	up: 0xf5,
	down: 0xf6,
};

const objectIdToDirection = invert(directionToObjectId) as Record<
	number,
	Direction
>;

const alternateObjectIdToDirection = invert(
	alternateDirectionToObjectId
) as Record<number, Direction>;

const CameraNudge: Entity = {
	paletteCategory: 'meta',
	paletteInfo: {
		title: 'Camera Nudge',
		description:
			'Causes the camera to nudge up or down once Mario crosses over it',
		warning: 'currently experimental',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xca,
	alternateObjectIds: Object.values(directionToObjectId),

	defaultSettings: { direction: 'up', nudgeSize: 0 },

	toSpriteBinary({ x, y, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const nudgeSize = (settings.nudgeSize ??
			this.defaultSettings!.nudgeSize) as number;

		const objectId = directionToObjectId[direction];

		// nudge amount is value - 0x80 in pixels, so 0x90 nudges by 16 pixels
		// TODO: I think this depends on settings in level settings, as Nintendo levels
		// seem to nudge by 8 px when they use the value 0x98
		return [0, objectId, x, y, 0x80 + Math.abs(nudgeSize)];
	},

	parseSprite(data, offset) {
		const result =
			parseSimpleSpriteObjectIdOverride(
				data,
				offset,
				0,
				directionToObjectId.up,
				this
			) ??
			parseSimpleSpriteObjectIdOverride(
				data,
				offset,
				0,
				directionToObjectId.down,
				this
			) ??
			parseSimpleSpriteObjectIdOverride(
				data,
				offset,
				0,
				alternateDirectionToObjectId.up,
				this
			) ??
			parseSimpleSpriteObjectIdOverride(
				data,
				offset,
				0,
				alternateDirectionToObjectId.down,
				this
			);

		if (result) {
			const nudgeSize = Math.abs(data[offset + 4] - 0x80);
			const direction =
				objectIdToDirection[data[offset + 1]] ??
				alternateObjectIdToDirection[data[offset + 1]];

			return {
				...result,
				entity: {
					...result.entity,
					settings: {
						direction,
						nudgeSize: direction === 'up' ? -nudgeSize : nudgeSize,
					},
				},
				offset: result.offset + 1,
			};
		}
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			fontSize: size * 0.17,
			borderRadius: '10%',
		};

		return (
			<div
				style={style}
				className="relative bg-indigo-700 text-white flex flex-col items-center justify-around p-0.5"
			>
				<div className="flex flex-row gap-x-1 items-center">
					<IconMovieCamera className="inline-block w-3 h-3" />
					nudge
				</div>
				<IconArrowUp className="w-1/2 h-1/2" />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const nudgeSize = (settings.nudgeSize ??
			this.defaultSettings!.nudgeSize) as number;

		const style =
			direction === 'up'
				? {
						width: TILE_SIZE,
						height: TILE_SIZE + Math.abs(nudgeSize),
						marginTop: nudgeSize,
						paddingTop: -nudgeSize,
				  }
				: {
						width: TILE_SIZE,
						height: TILE_SIZE + Math.abs(nudgeSize),
						paddingBottom: Math.abs(nudgeSize),
				  };

		const Icon = direction === 'up' ? IconArrowUp : IconArrowDown;
		const nudgeEl = (
			<div
				style={{ width: TILE_SIZE, height: Math.abs(nudgeSize) }}
				className={clsx(
					styles.arrow,
					'w-full opacity-50 xbg-green-500 pointer-events-none',
					{
						'absolute top-0 left-0': direction === 'up',
						'transform rotate-180': direction === 'down',
					}
				)}
			/>
		);

		return (
			<div style={style} className="relative">
				<div
					className="w-full h-full bg-indigo-700 text-white flex flex-col items-center justify-around"
					style={{
						fontSize: entity ? 4 : 2.25,
						padding: 1,
						borderRadius: '10%',
					}}
				>
					<div className="flex flex-row gap-x-0.5 items-baseline">
						<IconMovieCamera className="inline-block w-1 h-1" />
						{entity ? Math.abs(nudgeSize) : 'nudge'}
					</div>
					<button
						className="w-1/2 h-1/2 hover:bg-indigo-900"
						onMouseDown={(e) => {
							if (entity) {
								e.preventDefault();
								e.stopPropagation();
								const newDirection = direction === 'up' ? 'down' : 'up';
								onSettingsChange({
									direction: newDirection,
									nudgeSize: -nudgeSize,
								});
							} else {
								// prevent gaining focus outline
								e.preventDefault();
							}
						}}
					>
						<Icon className="w-full h-full" />
					</button>
					<Resizer
						className={clsx('absolute bottom-0 right-0', {
							'bottom-0': direction === 'down',
							'top-0': direction === 'up',
						})}
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={{ x: 1, y: nudgeSize }}
						increment={1}
						axis="y"
						onSizeChange={(newSizePoint) => {
							if (direction === 'up') {
								onSettingsChange({
									nudgeSize: clamp(newSizePoint.y, -127, 0),
								});
							} else {
								onSettingsChange({ nudgeSize: clamp(newSizePoint.y, 0, 127) });
							}
						}}
					/>
				</div>
				{!!entity && nudgeEl}
			</div>
		);
	},

	getProblem({ entity, room }) {
		if (entity.settings?.direction === 'up') {
			const nudgeDown = room.actors.entities.filter(
				(e) => e.type === 'CameraNudge' && e.settings?.direction === 'down'
			);

			if (!nudgeDown.some((e) => e.x > entity.x)) {
				return 'An up nudge must have a corresponding down nudge later in the level';
			}
		}
	},
};

export { CameraNudge };
