import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import clsx from 'clsx';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

function isWoodFloorAbove(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellAbove = room.stage.matrix[entity.y - 1]?.[entity.x];

	if (!cellAbove) {
		return false;
	}

	return cellAbove.type === 'WoodFloor';
}

/**
 * For woodfloor, it's not about being one wide
 * but rather about the top platform part being
 * at least two wide
 *
 * example: this is illegal
 *  WW
 * WWWW
 * WWWW
 *
 * this scenario satisfies "not one wide" for
 * all tiles, but the upper left/right corner blocks
 * will end up having a top platform that is one wide
 */
function isInvalidTopPlatform(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellToTop = room.stage.matrix[entity.y - 1]?.[entity.x];

	// if there is floor directly above, then this tile is fine
	if (cellToTop?.type === 'WoodFloor') {
		return false;
	}

	const cellToLeft = room.stage.matrix[entity.y]?.[entity.x - 1];
	const cellToRight = room.stage.matrix[entity.y]?.[entity.x + 1];
	const cellToUpLeft = room.stage.matrix[entity.y - 1]?.[entity.x - 1];
	const cellToUpRight = room.stage.matrix[entity.y - 1]?.[entity.x + 1];

	const okToLeft =
		cellToLeft?.type === 'WoodFloor' && cellToUpLeft?.type !== 'WoodFloor';
	const okToRight =
		cellToRight?.type === 'WoodFloor' && cellToUpRight?.type !== 'WoodFloor';

	return !okToLeft && !okToRight;
}

const WoodFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'WoodFloor',
		description: 'Must have a width of at least two',
	},

	objectSets: encodeObjectSets([[1, 1]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	settingsType: 'single',
	dimensions: 'xy',
	objectId: 0xb,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x17b,
				0x1a1f,
				0x329f,
				0x4b7f,
				0x3664,
				0x470a,
				0x5fb1,
				0xd73,
				0x19f8,
				0x2e5d,
				0x3edf,
				0x0,
				0x0,
			],
		],
		romOffset: 0x163768,
		tiles: [
			[610, 611],
			[610, 611],
		],
	},

	toObjectBinary(x, y, w, h): number[] {
		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	simpleRender(size) {
		return (
			<div
				className="WoodFloorTop-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(_showDetails, _settings, _osc, entity, room) {
		const woodAbove = isWoodFloorAbove(entity, room);

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div
				style={style}
				className={clsx('bg-cover', {
					'WoodFloor-bg': woodAbove,
					'WoodFloorTop-bg': !woodAbove,
				})}
			/>
		);
	},

	getWarning(_settings, entity, room) {
		if (isInvalidTopPlatform(entity, room)) {
			return 'The top platform area must be at least 2 tiles wide';
		}
	},
};

export { WoodFloor };
