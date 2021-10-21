import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { parseObjectIdMapSprite } from './util';
import { IconArrowLeft, IconArrowRight } from '../icons';
import invert from 'lodash/invert';

type Direction = 'left' | 'right';

const directionToObjectId: Record<Direction, number> = {
	right: 0xea,
	left: 0xc7,
};

const objectIdToDirection = invert(directionToObjectId) as Record<
	number,
	Direction
>;

const ScrollStopHorizontal: Entity = {
	paletteCategory: 'meta',
	paletteInfo: {
		title: 'Scroll Stop - Horizontal',
		description:
			'Stops the screen from scrolling horizontal, useful to prevent backtracking or keep a small room on screen',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xc7,
	alternateObjectIds: Object.values(directionToObjectId),
	settingsType: 'single',
	defaultSettings: { direction: 'left' },

	toSpriteBinary({ x, y, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const objectId = directionToObjectId[direction];

		return [0, objectId, x, y, 0];
	},

	parseSprite(data, offset) {
		return parseObjectIdMapSprite(
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
			fontSize: size * 0.17,
			borderRadius: '10%',
		};

		return (
			<div
				style={style}
				className="relative bg-red-500 text-white flex flex-col items-center justify-around p-0.5"
			>
				<div>scroll stop</div>
				<IconArrowLeft className="w-1/2 h-1/2" />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			fontSize: 2.25,
			padding: 1,
			borderRadius: '10%',
		};

		const Icon = direction === 'left' ? IconArrowLeft : IconArrowRight;

		return (
			<div
				style={style}
				className="relative bg-red-500 text-white flex flex-col items-center justify-around"
			>
				<div>scroll stop</div>
				<button
					className="w-1/2 h-1/2 hover:bg-red-700"
					onMouseDown={(e) => {
						if (entity) {
							e.preventDefault();
							e.stopPropagation();
							const newDirection = direction === 'left' ? 'right' : 'left';
							onSettingsChange({ direction: newDirection });
						} else {
							// prevent gaining focus outline
							e.preventDefault();
						}
					}}
				>
					<Icon className="w-full h-full" />
				</button>
			</div>
		);
	},

	getProblem({ settings, entity }) {
		const tx = entity.x / TILE_SIZE;
		const delta = 15 - tx;

		if (settings?.direction === 'left' && delta > 0) {
			return `Move over ${delta} tile${
				delta === 1 ? '' : 's'
			} to the right to work`;
		}
	},
};

export { ScrollStopHorizontal };
