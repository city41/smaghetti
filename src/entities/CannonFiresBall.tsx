import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets } from './util';
import { PayloadViewDetails } from './detailPanes/PayloadViewDetails';
import { HammerButton } from './detailPanes/HammerButton';

const directions = ['up-left', 'up-right', 'down-right', 'down-left'] as const;
type Direction = typeof directions[number];

const directionToObjectId: Record<Direction, number> = {
	'up-left': 0x6,
	'up-right': 0x7,
	'down-left': 0x8,
	'down-right': 0x9,
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

const CannonFiresBall: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-bowsers-army',
		title: 'Cannon - Fires Cannon Ball',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: [-1, -1, -1, 0, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x7,
	alternateObjectIds: Object.values(directionToObjectId),

	defaultSettings: { direction: 'up-left' },
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
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const objectId = directionToObjectId[direction];

		return [0, y, x, objectId];
	},

	toSpriteBinary({ x, y, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const spriteId = directionToCannonBallSpriteId[direction];

		return [1, spriteId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="CannonUpLeft-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute bottom-0 right-0 w-1/2 h-1/2 CannonBall-bg bg-cover bg-gray-800 rounded" />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const resourceClass = directionToResourceClass[direction];

		const style = { width: TILE_SIZE, height: TILE_SIZE };

		return (
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
							}}
						/>
					</div>
				)}
				<PayloadViewDetails size={TILE_SIZE / 3} payload="CannonBall" />
			</div>
		);
	},
};

export { CannonFiresBall };
