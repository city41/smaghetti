import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

function isPlatformToLeft(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellToLeft = room.stage.matrix[entity.y]?.[entity.x - 1];

	if (!cellToLeft) {
		return false;
	}

	return cellToLeft.type === 'WoodPlatform';
}

function isPlatformToRight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellToRight = room.stage.matrix[entity.y]?.[entity.x + 1];

	if (!cellToRight) {
		return false;
	}

	return cellToRight.type === 'WoodPlatform';
}

const WoodPlatform: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Wood Platform',
	},

	objectSets: encodeObjectSets([[4, 4]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'ignored',
	param2: 'width',
	objectId: 0x0,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x15d2,
				0x2257,
				0x2afc,
				0x37be,
				0x20ba,
				0x21be,
				0x32df,
				0x3192,
				0x1636,
				0x2a9c,
				0x42ff,
				0x0,
				0x0,
			],
		],
		romOffset: 0x163768,
		tiles: [
			[830, 830],
			[831, 831],
		],
	},

	toObjectBinary({ x, y, w }) {
		return [0x40, y, x, this.objectId, w];
	},

	simpleRender(size) {
		return (
			<div
				className="WoodPlatform-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ entity, room }) {
		const platformToLeft = isPlatformToLeft(entity, room);
		const platformToRight = isPlatformToRight(entity, room);

		const style = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div
				style={style}
				className={clsx({
					'WoodPlatform-bg': (platformToLeft && platformToRight) || !entity,
					'WoodPlatformLeft-bg': !platformToLeft && !!entity,
					'WoodPlatformRight-bg': !platformToRight && !!entity,
				})}
			/>
		);
	},

	getWarning({  entity, room }) {
		const platformToLeft = isPlatformToLeft(entity, room);
		const platformToRight = isPlatformToRight(entity, room);

		if (!platformToRight && !platformToLeft) {
			return 'Needs to be at least 2 tiles wide';
		}
	},
};

export { WoodPlatform };
