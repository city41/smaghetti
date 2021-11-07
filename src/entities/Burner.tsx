import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets } from './util';
import { IconArrowUp, IconArrowDown } from '../icons';
import type { IconType } from '../icons';

const directions = ['up', 'down'] as const;
type Direction = typeof directions[number];

const directionIcons: Record<Direction, IconType> = {
	up: IconArrowUp,
	down: IconArrowDown,
};

function isBurner(
	entity: EditorEntity | undefined,
	room: RoomData | undefined,
	delta: 1 | -1
): boolean {
	if (!entity || !room) {
		return false;
	}

	const otherCell = room.stage.matrix[entity.y + delta]?.[entity.x];

	return otherCell?.type === 'Burner';
}

const Burner: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-airship',
		title: 'Burner',
		description: 'Shoots fire',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: [0, -1, -1, -1, -1, -1],
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x2,
	emptyBank: 0,

	defaultSettings: { direction: 'up' },

	resource: {
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
			[686, 687],
			[686, 687],
		],
	},

	toSpriteBinary({ x, y, entity, room, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		if (direction === 'up') {
			if (isBurner(entity, room, -1)) {
				return [];
			}

			// the flame itself
			return [0, 0x9d, x, y - 3];
		} else {
			if (isBurner(entity, room, 1)) {
				return [];
			}

			// the flame itself
			return [0, 0xb2, x, y + 1];
		}
	},

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};
		return <div className="Burner-bg bg-cover" style={style} />;
	},

	render({ settings, onSettingsChange, entity, room }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const hasFlame = !isBurner(entity, room, direction === 'up' ? -1 : 1);

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const flame = hasFlame && (
			<div
				style={{
					width: TILE_SIZE * 3,
					height: TILE_SIZE,
					top: direction === 'up' ? -TILE_SIZE * 2 : TILE_SIZE * 2,
					left: -TILE_SIZE,
				}}
				className={clsx(
					'absolute BillBlasterBurnerFlame-bg bg-cover transform opacity-30',
					{
						'-rotate-90': direction === 'down',
						'rotate-90': direction === 'up',
					}
				)}
			/>
		);

		const DirectionIcon = directionIcons[direction];

		return (
			<div className="relative Burner-bg bg-cover" style={style}>
				{flame}
				{!!entity && (
					<div className="absolute w-full h-full grid place-items-center">
						<button
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();

								const curDirIndex = directions.indexOf(direction);
								const nexDirIndex = (curDirIndex + 1) % directions.length;
								onSettingsChange({ direction: directions[nexDirIndex] });
							}}
						>
							<DirectionIcon
								className={clsx('w-1.5 h-1.5 text-white', {
									'bg-blue-500': direction === 'up',
									'bg-yellow-500': direction === 'down',
								})}
							/>
						</button>
					</div>
				)}
			</div>
		);
	},
};

export { Burner };
