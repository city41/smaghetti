import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets } from './util';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import clsx from 'clsx';
import { PayloadEditDetails } from './detailPanes/PayloadEditDetails';
import { PayloadViewDetails } from './detailPanes/PayloadViewDetails';

type Direction = 'left' | 'right';

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const directionToObjectId: Record<Direction, number> = {
	left: 0x6,
	right: 0x7,
};

const directionToBobombSpriteId: Record<Direction, number> = {
	left: 0xa2,
	right: 0xa3,
};

const directionToCannonBallSpriteId: Record<Direction, number> = {
	left: 0x98,
	right: 0x99,
};

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
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x7,
	alternateObjectIds: Object.values(directionToObjectId),
	settingsType: 'single',
	defaultSettings: { direction: 'left', payload: 'CannonBall' },
	emptyBank: 0,

	resource: {
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

	toObjectBinary(x, y, _w, _h, settings) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const objectId = directionToObjectId[direction];

		return [0, y, x, objectId];
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const payload = settings.payload ?? this.defaultSettings!.payload;

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
				className="Cannon-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(showDetails, settings, onSettingsChange, entity) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const style = { width: TILE_SIZE, height: TILE_SIZE };
		const flipStyle =
			direction === 'right' ? { transform: 'scale(-1, 1)' } : {};

		const Icon = direction === 'right' ? FaArrowLeft : FaArrowRight;

		const body = (
			<div style={style} className="relative bg-cover group">
				<div
					style={flipStyle}
					className="Cannon-bg absolute top-0 left-0 w-full h-full"
				/>

				{!!entity && (
					<div
						className={clsx(
							'w-full h-full flex flex-row justify-start items-end border absolute top-0 left-0',
							{
								'border-blue-200': direction === 'right',
								'border-yellow-200': direction === 'left',
							}
						)}
					>
						<button
							className="hidden group-hover:block"
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onSettingsChange({
									direction: direction === 'left' ? 'right' : 'left',
								});
							}}
						>
							<Icon
								className={clsx('w-1.5 h-1.5 text-white', {
									'bg-blue-500': direction === 'left',
									'bg-yellow-500': direction === 'right',
								})}
							/>
						</button>
						<PayloadViewDetails payload={settings.payload} />
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
					payloads={['CannonBall', 'Bobomb']}
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
