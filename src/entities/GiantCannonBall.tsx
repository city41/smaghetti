import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets, parseObjectIdMapSprite } from './util';
import invert from 'lodash/invert';
import { directionToObjectId } from './ArrowSign';
import { IconArrowLeft, IconArrowRight } from '../icons';

const directions = ['left', 'right'];
type Direction = typeof directions[number];

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const directionToSpriteId: Record<Direction, number> = {
	left: 0x97,
	right: 0xa1,
};

const spriteIdToDirection = invert(directionToObjectId) as Record<
	number,
	Direction
>;

const GiantCannonBall: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-bowsers-army',
		title: 'Giant Cannon Ball',
		description:
			'Normally fired from a pipe, but maybe you can get more creative with it.',
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
	objectId: 0x97,
	alternateObjectIds: Object.values(directionToSpriteId),

	defaultSettings: { direction: 'left' },
	emptyBank: 0,
	width: 2,
	height: 2,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x11f1,
				0x1a75,
				0x22f9,
				0x318c,
				0x4631,
				0x56b5,
				0x2b5c,
				0xda,
				0x219e,
				0x363f,
				0x7eb7,
				0x6e11,
				0x596d,
			],
		],
		romOffset: 0x163768,
		tiles: [
			[138, 139, 140, 141],
			[154, 155, 156, 157],
			[170, 171, 172, 173],
			[186, 187, 188, 189],
		],
	},

	toSpriteBinary({ x, y, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const spriteId = directionToSpriteId[direction];

		return [1, spriteId, x, y];
	},

	parseSprite(data, offset) {
		return parseObjectIdMapSprite(
			data,
			offset,
			1,
			spriteIdToDirection,
			'direction',
			this
		);
	},

	simpleRender(size) {
		return (
			<div
				className="GiantCannonBall-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const style = { width: TILE_SIZE * 2, height: TILE_SIZE * 2 };

		const Icon = direction === 'left' ? IconArrowLeft : IconArrowRight;

		return (
			<div style={style} className="relative">
				<div className="absolute GiantCannonBall-bg top-0 left-0 w-full h-full" />

				{!!entity && (
					<div className="w-full h-full flex flex-row justify-center items-center absolute top-0 left-0">
						<button
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();
								const curDirIndex = directions.indexOf(direction);
								const nextDirIndex = (curDirIndex + 1) % directions.length;
								const nextDir = directions[nextDirIndex];

								onSettingsChange({
									direction: nextDir,
								});
							}}
						>
							<Icon
								style={{ borderRadius: '10%' }}
								className="w-1.5 h-1.5 bg-gray-700 text-white"
							/>
						</button>
					</div>
				)}
			</div>
		);
	},
};

export { GiantCannonBall };
