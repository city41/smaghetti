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
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Goomba Generator',
		description:
			'Usually they come out of a pipe. They turn off once Mario moves past the generator.',
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

	toSpriteBinary(x, y, _w, _h, settings) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const objectId = directionToObjectId[direction];

		return [1, objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="relative Goomba-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="w-full h-full flex flex-col justify-center items-center z-10">
					<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
						generatr
					</div>
				</div>
			</div>
		);
	},

	render(_showDetails, settings, onSettingsChange, entity) {
		const style = { width: TILE_SIZE, height: TILE_SIZE };

		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const DirectionIcon = direction === 'left' ? FaArrowLeft : FaArrowRight;

		const labelStyle = {
			fontSize: 2,
			bottom: 0,
		};

		return (
			<div style={style} className="relative Goomba-bg bg-cover">
				<div
					className={clsx(
						'w-full h-full flex flex-col justify-center items-center border z-10',
						{
							'border-blue-200': direction === 'right',
							'border-yellow-200': direction === 'left',
						}
					)}
				>
					{!!entity && (
						<button
							className="pt-0.5"
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
					)}
					<div
						className="absolute left-0 w-full text-center bg-black text-white"
						style={labelStyle}
					>
						generator
					</div>
				</div>
			</div>
		);
	},
};

export { GoombaGenerator };
