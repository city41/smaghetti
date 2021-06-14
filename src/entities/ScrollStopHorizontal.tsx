import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

type Direction = 'left' | 'right';

const directionToObjectId: Record<Direction, number> = {
	right: 0xea,
	left: 0xc7,
};

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
	defaultSettings: { direction: 'right' },

	toSpriteBinary(x, y, _w, _h, settings) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const objectId = directionToObjectId[direction];

		return [0, objectId, x, y, 0];
	},

	simpleRender(size) {
		const style = { width: size, height: size, fontSize: size * 0.17 };

		return (
			<div
				style={style}
				className="relative bg-red-500 text-white flex flex-col items-center justify-around rounded-lg p-0.5"
			>
				<div>scroll stop</div>
				<FaArrowRight className="w-1/2 h-1/2" />
			</div>
		);
	},

	render(_showDetails, settings, onSettingsChange, entity) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			fontSize: 2.25,
			padding: 1,
		};

		const Icon = direction === 'left' ? FaArrowLeft : FaArrowRight;

		return (
			<div
				style={style}
				className="relative bg-red-500 text-white flex flex-col items-center justify-around rounded"
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
};

export { ScrollStopHorizontal };
