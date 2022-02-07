import React from 'react';
import clsx from 'clsx';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';
import {
	IconArrowUp,
	IconArrowDown,
	IconArrowLeft,
	IconArrowRight,
	IconMovieCamera,
} from '../../icons';
import { parseSimpleSpriteObjectIdOverride } from '../util';
import { Resizer } from '../../components/Resizer';
import clamp from 'lodash/clamp';

import styles from './CameraNudge.module.css';

const directions = ['up', 'right', 'down', 'left'] as const;
type Direction = typeof directions[number];

const directionToObjectId: Record<Direction, number> = {
	up: 0xca,
	down: 0xcb,
	left: 6,
	right: 5,
};

// these are also camera nudge sprites, and so far they seem
// to behave identically, so Smaghetti treats them the same when parsing
const objectIdToDirection: Record<number, Direction> = {
	0xca: 'up',
	0xf5: 'up',
	0xe0: 'up',
	0xcb: 'down',
	0xf6: 'down',
	0xe1: 'down',
	6: 'left',
	5: 'right',
};

const directionToNudgeMultiplier: Record<Direction, 1 | -1> = {
	up: -1,
	down: 1,
	left: -1,
	right: 1,
};

const objectIdToByteSize: Record<number, number> = {
	0xca: 5,
	0xf5: 5,
	0xe0: 6,
	0xcb: 5,
	0xf6: 5,
	0xe1: 6,
	6: 6,
	5: 6,
};

const bankZeroIds = [0xca, 0xcb, 0xf5, 0xf6, 0xe0, 0xe1];
const bankOneIds = [5, 6];

const CameraNudge: Entity = {
	paletteCategory: 'meta',
	experimental: true,
	paletteInfo: {
		title: 'Camera Nudge',
		description:
			'Causes the camera to nudge in a direction once Mario crosses over it',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xca,
	alternateObjectIds: Object.keys(objectIdToDirection).map(Number),

	defaultSettings: { direction: 'up', nudgeSize: 0 },

	toSpriteBinary({ x, y, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const nudgeSize = (settings.nudgeSize ??
			this.defaultSettings!.nudgeSize) as number;

		const objectId = directionToObjectId[direction];

		if (direction === 'up' || direction === 'down') {
			// nudge amount is value - 0x80 in pixels, so 0x90 nudges by 16 pixels
			// TODO: I think this depends on settings in level settings, as Nintendo levels
			// seem to nudge by 8 px when they use the value 0x98
			return [0, objectId, x, y, 0x80 + Math.abs(nudgeSize)];
		} else {
			// starting by copying what is in 1-1 and 1-2
			return [1, objectId, x, y, 9, Math.abs(nudgeSize)];
		}
	},

	parseSprite(data, offset) {
		const result =
			parseSimpleSpriteObjectIdOverride(data, offset, 0, bankZeroIds, this) ??
			parseSimpleSpriteObjectIdOverride(data, offset, 1, bankOneIds, this);

		if (result) {
			// e0/e1/5/6 are six byte sprites. for now ignoring their fifth byte, the sixth byte
			// seems to be their nudge amount. lumping them into here may be a mistake, but
			// going with it for now
			const objectId = data[offset + 1];
			const byteSize = objectIdToByteSize[objectId];
			const nudgeIndex = byteSize - 1;
			const offsetBump = byteSize - 4;
			const nudgeSubtractor = objectId === 0xca || objectId === 0xcb ? 0x80 : 0;
			const nudgeSize = Math.abs(data[offset + nudgeIndex] - nudgeSubtractor);
			const direction = objectIdToDirection[data[offset + 1]];

			return {
				...result,
				entity: {
					...result.entity,
					settings: {
						direction,
						nudgeSize:
							direction === 'up' || direction === 'left'
								? -nudgeSize
								: nudgeSize,
					},
				},
				offset: result.offset + offsetBump,
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

		let rootStyle = {};
		let nudgeStyle = {};
		let arrowClassName = styles.arrowVertical;
		let Icon = IconArrowUp;
		let onSizeChange: (p: Point) => void;
		let axis: 'x' | 'y' = 'y';

		switch (direction) {
			case 'up':
				Icon = IconArrowUp;
				rootStyle = {
					width: TILE_SIZE,
					height: TILE_SIZE + Math.abs(nudgeSize),
					marginTop: nudgeSize,
					paddingTop: -nudgeSize,
				};
				nudgeStyle = {
					width: TILE_SIZE,
					height: Math.abs(nudgeSize),
					position: 'absolute',
					top: 0,
					left: 0,
				};
				arrowClassName = styles.arrowVertical;
				onSizeChange = (newSizePoint: Point) => {
					onSettingsChange({
						nudgeSize: clamp(newSizePoint.y, -127, 0),
					});
				};
				axis = 'y';
				break;
			case 'down':
				Icon = IconArrowDown;
				rootStyle = {
					width: TILE_SIZE,
					height: TILE_SIZE + Math.abs(nudgeSize),
					paddingBottom: Math.abs(nudgeSize),
				};
				nudgeStyle = {
					width: TILE_SIZE,
					height: Math.abs(nudgeSize),
					transform: 'rotate(180deg)',
				};
				arrowClassName = styles.arrowVertical;
				onSizeChange = (newSizePoint: Point) => {
					onSettingsChange({ nudgeSize: clamp(newSizePoint.y, 0, 127) });
				};
				axis = 'y';
				break;
			case 'right':
				Icon = IconArrowRight;
				rootStyle = {
					width: TILE_SIZE + Math.abs(nudgeSize),
					height: TILE_SIZE,
				};
				nudgeStyle = {
					width: Math.abs(nudgeSize),
					height: TILE_SIZE,
					position: 'absolute',
					left: TILE_SIZE,
					top: 0,
				};
				arrowClassName = styles.arrowHorizontal;
				onSizeChange = (newSizePoint: Point) => {
					onSettingsChange({ nudgeSize: clamp(newSizePoint.x, 0, 127) });
				};
				axis = 'x';
				break;
			case 'left':
				Icon = IconArrowLeft;
				rootStyle = {
					width: TILE_SIZE + Math.abs(nudgeSize),
					height: TILE_SIZE,
					marginLeft: -Math.abs(nudgeSize),
					paddingLeft: Math.abs(nudgeSize),
				};
				nudgeStyle = {
					width: Math.abs(nudgeSize),
					height: TILE_SIZE,
					position: 'absolute',
					left: 0,
					top: 0,
					transform: 'rotate(180deg)',
				};
				arrowClassName = styles.arrowHorizontal;
				onSizeChange = (newSizePoint: Point) => {
					onSettingsChange({ nudgeSize: clamp(newSizePoint.x, -127, 0) });
				};
				axis = 'x';
				break;
		}

		const nudgeEl = (
			<div
				style={nudgeStyle}
				className={clsx(
					arrowClassName,
					'opacity-50 bg-green-500 pointer-events-none'
				)}
			/>
		);

		return (
			<div style={rootStyle} className="relative">
				<div
					className="bg-indigo-700 text-white flex flex-col items-center justify-around"
					style={{
						width: TILE_SIZE,
						height: TILE_SIZE,
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
								const di = directions.indexOf(direction);
								const ndi = (di + 1) % directions.length;

								const newDirection = directions[ndi];

								onSettingsChange({
									direction: newDirection,
									nudgeSize:
										Math.abs(nudgeSize) *
										directionToNudgeMultiplier[newDirection],
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
						key={direction}
						className={clsx('absolute', {
							'bottom-0 right-0': direction === 'down' || direction === 'right',
							'bottom-0 left-0': direction === 'left',
							'top-0 right-0': direction === 'up',
						})}
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={nudgeSize}
						increment={1}
						axis={axis}
						onSizeChange={onSizeChange!}
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
