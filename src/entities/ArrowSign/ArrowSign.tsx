import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { TileSpace } from '../TileSpace';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';
import { encodeObjectSets, parseObjectIdMapObject } from '../util';
import invert from 'lodash/invert';
import { HammerButton } from '../detailPanes/HammerButton';

const directions = ['left', 'right'] as const;
type Direction = typeof directions[number];

const directionToObjectId: Record<Direction, number> = {
	left: 0x4c,
	right: 0x4b,
};

const objectIdToDirection = invert(directionToObjectId) as Record<
	number,
	Direction
>;

const ArrowSign: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Arrow Sign',
	},

	objectId: 0x4b,
	alternateObjectIds: Object.values(directionToObjectId),
	emptyBank: 0,
	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	dimensions: 'none',
	defaultSettings: { direction: 'right' },
	width: 2,
	height: 2,

	resource: {
		romOffset: 0x20e4f0,
		palettes: [
			[
				0x23df,
				0x7fff,
				0x0,
				0x4e71,
				0x5ef5,
				0x6f79,
				0x7bdd,
				0x13,
				0x19,
				0x1f,
				0x112,
				0x5a1f,
				0x6ebf,
				0x7f9f,
				0x579f,
				0x6fff,
			],
		],
		tiles: [
			// TODO: 74 is a blank tile, need to support null tiles here
			[74, 74, 74],
			[41, 42, 43],
			[57, 58, 59],
			[74, 31, 74],
		],
	},

	toObjectBinary({ x, y, settings }) {
		const direction = (settings?.direction ??
			this.defaultSettings!.direction) as Direction;
		const objectId = directionToObjectId[direction];

		return [0, y, x, objectId];
	},

	parseObject(data, offset) {
		return parseObjectIdMapObject(
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
			backgroundSize: '66% 100%',
		};

		return (
			<div className="ArrowSign-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render({ settings, onSettingsChange }) {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
		};
		const transformStyle =
			settings.direction === 'left' ? { transform: 'scale(-1, 1)' } : {};

		return (
			<div className="relative" style={style}>
				<div
					className="absolute top-0 left-0 w-full h-full ArrowSign-bg bg-no-repeat"
					style={{ ...transformStyle, backgroundSize: '75%' }}
				/>
				<HammerButton
					style={{
						bottom: 0,
						left: 0,
						top: 'initial',
						width: 'auto',
						height: 'auto',
					}}
					values={directions}
					currentValue={settings.direction}
					onNewValue={(newDirection) => {
						onSettingsChange({ direction: newDirection });
					}}
				/>
				<TileSpace />
			</div>
		);
	},
};

export { ArrowSign, directionToObjectId };
