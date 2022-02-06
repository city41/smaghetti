import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { IconArrowUp, IconArrowDown } from '../icons';
import invert from 'lodash/invert';
import { parseSimpleSpriteObjectIdOverride } from './util';

type Direction = 'up' | 'down';

const directionToObjectId: Record<Direction, number> = {
	up: 0xca,
	down: 0xf6,
};

const objectIdToDirection = invert(directionToObjectId) as Record<
	number,
	Direction
>;

const CameraNudge: Entity = {
	paletteCategory: 'binary',
	paletteInfo: {
		title: 'Camera Nudge',
		description:
			'Causes the camera to nudge up or down once Mario crosses over it',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xca,
	alternateObjectIds: Object.values(directionToObjectId),

	defaultSettings: { direction: 'up' },

	toSpriteBinary({ x, y, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const objectId = directionToObjectId[direction];

		// hard coding 0x98 for now, as that is used in classic 1-4
		// it is possible this isn't really y, because this sprite
		// probably doesn't need to care about y
		return [0, objectId, y, x, settings.fromParse ?? 0x98];
	},

	parseSprite(data, offset) {
		const result =
			parseSimpleSpriteObjectIdOverride(
				data,
				offset,
				0,
				directionToObjectId.up,
				this
			) ??
			parseSimpleSpriteObjectIdOverride(
				data,
				offset,
				0,
				directionToObjectId.down,
				this
			);

		if (result) {
			return {
				...result,
				entity: {
					...result.entity,
					settings: {
						direction: objectIdToDirection[data[offset + 1]],
						fromParse: data[offset + 4],
					},
				},
				offset: result.offset + 1,
			};
		}
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
				className="relative bg-yellow-700 text-white flex flex-col items-center justify-around p-0.5"
			>
				<div>cam nudge</div>
				<IconArrowUp className="w-1/2 h-1/2" />
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

		const Icon = direction === 'up' ? IconArrowUp : IconArrowDown;

		return (
			<div
				style={style}
				className="relative bg-yellow-700 text-white flex flex-col items-center justify-around"
			>
				<div>cam nudge</div>
				<button
					className="w-1/2 h-1/2 hover:bg-yellow-900"
					onMouseDown={(e) => {
						if (entity) {
							e.preventDefault();
							e.stopPropagation();
							const newDirection = direction === 'up' ? 'down' : 'up';
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

export { CameraNudge };
