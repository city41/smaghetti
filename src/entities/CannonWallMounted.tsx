import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets } from './util';
import clsx from 'clsx';
import { AngleEditDetails } from './detailPanes/AngleEditDetails';

const cannonBallDirectionToObjectId = {
	'up-right': 0xc,
	'down-left': 0xc,
	'down-right': 0xd,
	'up-left': 0xd,
} as const;

type CannonBallDirection = keyof typeof cannonBallDirectionToObjectId;

const cannonBallDirectionToCannonBallSpriteId = {
	'up-left': 0x9c,
	'up-right': 0x9d,
	'down-left': 0x9e,
	'down-right': 0x9f,
} as const;

const cannonBallDirectionToAngle: Record<CannonBallDirection, number> = {
	'up-right': 45,
	'down-right': 135,
	'down-left': 225,
	'up-left': 315,
} as const;

const angleToCannonBallDirection: Record<number, CannonBallDirection> = {
	45: 'up-right',
	225: 'down-left',
	135: 'down-right',
	315: 'up-left',
} as const;

function normalizeAngle(angle: number): number {
	while (angle > 360) {
		angle -= 360;
	}

	while (angle < 0) {
		angle += 360;
	}

	return angle;
}

const CANNON_BALL_OFFSET = 5;

const cannonBallDirectionToPosition: Record<
	CannonBallDirection,
	{ top: number; left: number }
> = {
	'up-right': {
		top: -CANNON_BALL_OFFSET,
		left: TILE_SIZE + CANNON_BALL_OFFSET,
	},
	'down-right': {
		top: TILE_SIZE + CANNON_BALL_OFFSET,
		left: TILE_SIZE + CANNON_BALL_OFFSET,
	},
	'down-left': {
		top: TILE_SIZE + CANNON_BALL_OFFSET,
		left: -CANNON_BALL_OFFSET,
	},
	'up-left': { top: -CANNON_BALL_OFFSET, left: -CANNON_BALL_OFFSET },
};

const cannonBallDirectionToSpriteOffset: Record<CannonBallDirection, Point> = {
	'up-right': { x: 1, y: 0 },
	'down-right': { x: 1, y: 1 },
	'down-left': { x: 0, y: 1 },
	'up-left': { x: 0, y: 0 },
};

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const CannonWallMounted: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-airship',
		title: 'Cannon - Wall Mounted',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		-1,
		0,
		graphicSets,
		graphicSets,
	],
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xd,
	alternateObjectIds: Object.values(cannonBallDirectionToObjectId),
	emptyBank: 0,

	defaultSettings: { cannonBallDirection: 'down-left' },
	width: 2,
	height: 2,

	resources: {
		CannonWallMountedUpRight: {
			palettes: [
				[
					32662,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					9852,
					17247,
					23487,
					15753,
					18957,
					22096,
					25266,
					28437,
					30584,
				],
			],
			tiles: [
				[704, 709, 710, 707],
				[724, 725, 726, 727],
				[740, 741, 742, 743],
				[756, 757, 758, 759],
			],
			romOffset: 1534952,
		},
		CannonWallMountedDownRight: {
			palettes: [
				[
					32662,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					9852,
					17247,
					23487,
					15753,
					18957,
					22096,
					25266,
					28437,
					30584,
				],
			],
			tiles: [
				[704, 705, 706, 707],
				[720, 721, 722, 723],
				[736, 737, 738, 739],
				[752, 753, 754, 755],
			],
			romOffset: 1534952,
		},
	},

	toSpriteBinary({ x, y, settings }) {
		const cannonBallDirection = (settings.cannonBallDirection ??
			this.defaultSettings!.cannonBallDirection) as CannonBallDirection;

		const spriteId =
			cannonBallDirectionToCannonBallSpriteId[cannonBallDirection];

		const offset = cannonBallDirectionToSpriteOffset[cannonBallDirection];

		return [1, spriteId, x + offset.x, y + offset.y];
	},

	toObjectBinary({ x, y, settings }) {
		const cannonBallDirection = (settings.cannonBallDirection ??
			this.defaultSettings!.cannonBallDirection) as CannonBallDirection;

		const objectId = cannonBallDirectionToObjectId[cannonBallDirection];

		return [0, y, x, objectId];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};
		return (
			<div className="CannonWallMountedUpRight-bg bg-cover" style={style} />
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const cannonBallDirection = (settings.cannonBallDirection ??
			this.defaultSettings!.cannonBallDirection) as CannonBallDirection;

		const cannonBallStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			...cannonBallDirectionToPosition[cannonBallDirection],
		};

		return (
			<AngleEditDetails
				width={2 * TILE_SIZE}
				height={2 * TILE_SIZE}
				currentAngle={cannonBallDirectionToAngle[cannonBallDirection]}
				onAngleChange={(angle) => {
					const normalizedAngle = normalizeAngle(angle);
					onSettingsChange({
						cannonBallDirection: angleToCannonBallDirection[normalizedAngle],
					});
				}}
				disabled={!entity}
			>
				<div
					className={clsx('relative w-full h-full bg-cover', {
						'CannonWallMountedUpRight-bg':
							cannonBallDirection === 'up-right' ||
							cannonBallDirection === 'down-left',
						'CannonWallMountedDownRight-bg':
							cannonBallDirection === 'down-right' ||
							cannonBallDirection === 'up-left',
					})}
				>
					<div
						style={cannonBallStyle}
						className="absolute CannonBall-bg bg-cover"
					/>
				</div>
			</AngleEditDetails>
		);
	},
};

export { CannonWallMounted };
