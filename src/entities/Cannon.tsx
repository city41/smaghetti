import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets } from './util';
import { PayloadEditDetails } from './detailPanes/PayloadEditDetails';
import { PayloadViewDetails } from './detailPanes/PayloadViewDetails';
import { HammerButton } from './detailPanes/HammerButton';

const directions = ['up-left', 'up-right', 'down-right', 'down-left'] as const;
type Direction = typeof directions[number];

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const directionToObjectId: Record<Direction, number> = {
	'up-left': 0x6,
	'up-right': 0x7,
	'down-left': 0x8,
	'down-right': 0x9,
};

const directionToBobombSpriteId: Record<Direction, number> = {
	'up-left': 0xa2,
	'up-right': 0xa3,
	// bobombs can only fire up. toSpriteBinary handles this
	'down-left': -1,
	'down-right': -1,
};

const directionToCannonBallSpriteId: Record<Direction, number> = {
	'up-left': 0x98,
	'up-right': 0x99,
	'down-left': 0x9a,
	'down-right': 0x9b,
};

const directionToResourceClass: Record<Direction, string> = {
	'up-left': 'CannonUpLeft-bg',
	'up-right': 'CannonUpRight-bg',
	'down-left': 'CannonDownLeft-bg',
	'down-right': 'CannonDownRight-bg',
};

function getDirection(settings: EditorEntitySettings): Direction {
	const direction = settings.direction ?? 'up-left';

	// first version of Cannon only had left | right
	if (direction === 'left') {
		return 'up-left';
	}

	if (direction === 'right') {
		return 'up-right';
	}

	return direction;
}

const Cannon: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-airship',
		title: 'Cannon',
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
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x7,
	alternateObjectIds: Object.values(directionToObjectId),
	settingsType: 'single',
	defaultSettings: { direction: 'up-left', payload: 'CannonBall' },
	emptyBank: 0,

	resources: {
		CannonUpLeft: {
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
			romOffset: 0x16ea40,
			tiles: [
				[320, 321],
				[336, 337],
			],
		},
		CannonUpRight: {
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
			romOffset: 0x16ea40,
			tiles: [
				[323, 324],
				[339, 340],
			],
		},
		CannonDownRight: {
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
			romOffset: 0x16ea40,
			tiles: [
				[366, 367],
				[382, 383],
			],
		},
		CannonDownLeft: {
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
			romOffset: 0x16ea40,
			tiles: [
				[364, 365],
				[380, 381],
			],
		},
	},

	toObjectBinary({ x, y, settings }) {
		const direction = getDirection(settings);
		const objectId = directionToObjectId[direction];

		return [0, y, x, objectId];
	},

	toSpriteBinary({ x, y, settings }) {
		const direction = getDirection(settings);
		const payload = settings.payload ?? this.defaultSettings!.payload;

		// somehow got in a bad state, a downward cannon that was told
		// to fire bobombs. bobombs can only fire up, so just bail
		if (payload === 'Bobomb' && direction.startsWith('down')) {
			return [];
		}

		const idMap =
			payload === 'CannonBall'
				? directionToCannonBallSpriteId
				: directionToBobombSpriteId;

		const spriteId = idMap[direction];

		return [1, spriteId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="CannonUpLeft-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ showDetails, settings, onSettingsChange, entity }) {
		const direction = getDirection(settings);
		const resourceClass = directionToResourceClass[direction];

		const style = { width: TILE_SIZE, height: TILE_SIZE };

		const body = (
			<div style={style} className="relative bg-cover group">
				<div
					className={clsx(resourceClass, 'absolute top-0 left-0 w-full h-full')}
				/>

				{!!entity && (
					<div className="w-full h-full flex flex-row justify-start items-end absolute top-0 left-0">
						<HammerButton
							className="hidden group-hover:block"
							values={directions}
							currentValue={direction}
							onNewValue={(nextDir) => {
								onSettingsChange({
									direction: nextDir,
								});

								// bobombs can only fire up, so if the cannon is facing
								// down, make sure its set to cannonball
								if (nextDir.startsWith('down')) {
									onSettingsChange({
										payload: 'CannonBall',
									});
								}
							}}
						/>
						<PayloadViewDetails
							size={TILE_SIZE / 3}
							payload={settings.payload}
						/>
					</div>
				)}
			</div>
		);

		if (showDetails) {
			return (
				<PayloadEditDetails
					width={TILE_SIZE}
					height={TILE_SIZE}
					onPayloadChange={(payload) => onSettingsChange({ payload })}
					payloads={
						direction.startsWith('down')
							? ['CannonBall']
							: ['CannonBall', 'Bobomb']
					}
					disabledPayloads={direction.startsWith('down') ? ['Bobomb'] : []}
				>
					{body}
				</PayloadEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { Cannon };
