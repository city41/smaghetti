import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import clsx from 'clsx';
import { GeneratorFrame } from './components/GeneratorFrame';
import { parseObjectIdMapSprite } from './util';
import invert from 'lodash/invert';
import { IconArrowLeft, IconArrowRight } from '../icons';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

type Direction = 'left' | 'right';

const directionToObjectId: Record<Direction, number> = {
	left: 0x94,
	right: 0x95,
};

const objectIdToDirection = invert(directionToObjectId) as Record<
	number,
	Direction
>;

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

	defaultSettings: { direction: 'right' },

	toSpriteBinary({ x, y, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const objectId = directionToObjectId[direction];

		return [1, objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseObjectIdMapSprite(
			data,
			offset,
			1,
			objectIdToDirection,
			'direction',
			this
		);
	},

	simpleRender(size) {
		const style = {
			backgroundPositionX: '20%',
			backgroundPositionY: '25%',
			backgroundSize: '60%',
		};

		return (
			<GeneratorFrame
				size={size}
				resourceClassName="Goomba-bg bg-no-repeat"
				resourceStyle={style}
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const style = {
			backgroundPositionX: '20%',
			backgroundPositionY: '25%',
			backgroundSize: '60%',
		};

		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const DirectionIcon = direction === 'left' ? IconArrowLeft : IconArrowRight;

		const buttonStyle = {
			top: 0,
			right: 0,
		};

		return (
			<GeneratorFrame
				size={TILE_SIZE}
				resourceClassName="relative Goomba-bg bg-no-repeat overflow-hidden"
				resourceStyle={style}
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
			</GeneratorFrame>
		);
	},
};

export { GoombaGenerator };
