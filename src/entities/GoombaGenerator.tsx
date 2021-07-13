import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import clsx from 'clsx';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { GiFactory } from 'react-icons/gi';

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
		const style = {
			width: size,
			height: size,
			backgroundPositionX: '20%',
			backgroundPositionY: '25%',
			backgroundSize: '60%',
			borderRadius: '10%',
		};

		const iconStyle = {
			width: size / 2,
			height: size / 2,
			padding: '4%',
		};

		return (
			<div
				style={style}
				className="relative Goomba-bg bg-no-repeat bg-green-600 overflow-hidden"
			>
				<GiFactory
					style={iconStyle}
					className="absolute bottom-0 right-0 text-white"
					title="generator"
				/>
			</div>
		);
	},

	render(_showDetails, settings, onSettingsChange, entity) {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundPositionX: '20%',
			backgroundPositionY: '25%',
			backgroundSize: '60%',
			borderRadius: '10%',
		};

		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const DirectionIcon = direction === 'left' ? FaArrowLeft : FaArrowRight;

		const iconStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE / 2,
			padding: '4%',
		};

		const buttonStyle = {
			top: 0,
			right: 0,
		};

		return (
			<div
				style={style}
				className="relative Goomba-bg bg-no-repeat bg-green-600 overflow-hidden"
			>
				{!!entity && (
					<button
						className="absolute"
						style={buttonStyle}
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
								'bg-purple-500': direction === 'right',
								'bg-yellow-500': direction === 'left',
							})}
						/>
					</button>
				)}
				<GiFactory
					style={iconStyle}
					className="absolute bottom-0 right-0 text-white"
					title="generator"
				/>
			</div>
		);
	},
};

export { GoombaGenerator };
