import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import clsx from 'clsx';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

type Direction = 'left' | 'right';

const directionToObjectId: Record<Direction, number> = {
	left: 0x94,
	right: 0x95,
};

const GoombaGenerator: Entity = {
	// paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Goomba Generator',
		description: 'Usually they come out of a pipe',
		warning: "for some reason going right doesn't work yet",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x94,
	alternateObjectIds: [0x95],
	settingsType: 'single',
	defaultSettings: { direction: 'right' },

	resource: {
		romOffset: 0x134104,
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x101a,
			0x10bf,
			0x125f,
			0x25fd,
			0x369e,
			0x475f,
			0x139f,
			0x177,
			0x21c,
			0x29f,
			0x47bf,
			0x137f,
			0x25f,
		],
		tiles: [
			[394, 395],
			[426, 427],
		],
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const objectId = directionToObjectId[direction];

		return [1, objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div className="Goomba-bg bg-cover" style={{ width: size, height: size }}>
				<div className="w-full h-full flex flex-col justify-end items-center z-10">
					<FaArrowRight className="w-5 h-5 text-white bg-blue-500" />
				</div>
			</div>
		);
	},

	render(_showDetails, settings, onSettingsChange) {
		const style = { width: TILE_SIZE, height: TILE_SIZE };

		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const DirectionIcon = direction === 'left' ? FaArrowLeft : FaArrowRight;

		return (
			<div style={style} className="Goomba-bg bg-cover">
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
						<DirectionIcon
							className={clsx('w-1.5 h-1.5 text-white', {
								'bg-blue-500': direction === 'right',
								'bg-yellow-500': direction === 'left',
							})}
						/>
					</button>
				</div>
			</div>
		);
	},
};

export { GoombaGenerator };
