import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets } from './util';
import { FaArrowLeft } from 'react-icons/fa';
import clsx from 'clsx';

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

const Cannon: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-airship',
		title: 'Cannon',
		warning: 'So far, can only fire Bobombs',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		-1,
		graphicSets,
		graphicSets,
		graphicSets,
	],
	layer: 'actor',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x7,
	alternateObjectIds: Object.values(directionToObjectId),
	settingsType: 'single',
	defaultSettings: { direction: 'left' },
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
		const spriteId = directionToBobombSpriteId[direction];

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

	render(_showDetails, settings, onSettingsChange, entity) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const style = { width: TILE_SIZE, height: TILE_SIZE };
		const flipStyle =
			direction === 'right' ? { transform: 'scale(-1, 1)' } : {};

		return (
			<div style={{ ...style, ...flipStyle }} className="Cannon-bg bg-cover">
				{!!entity && (
					<div
						className={clsx(
							'w-full h-full flex flex-col justify-end items-center border z-10',
							{
								'border-blue-200': direction === 'right',
								'border-yellow-200': direction === 'left',
							}
						)}
					>
						<button
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onSettingsChange({
									direction: direction === 'left' ? 'right' : 'left',
								});
							}}
						>
							<FaArrowLeft
								className={clsx('w-1.5 h-1.5 text-white', {
									'bg-blue-500': direction === 'right',
									'bg-yellow-500': direction === 'left',
								})}
							/>
						</button>
					</div>
				)}
			</div>
		);
	},
};

export { Cannon };
