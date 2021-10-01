import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import clsx from 'clsx';

function isBushToLeft(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellToLeft = room.stage.matrix[entity.y]?.[entity.x - 1];

	return cellToLeft?.type === 'FullerFlowerBush';
}

function isBushToRight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellToRight = room.stage.matrix[entity.y]?.[entity.x + 1];

	return cellToRight?.type === 'FullerFlowerBush';
}

const FullerFlowerBush: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Flower Bush - Fuller',
	},

	objectSets: encodeObjectSets([
		[4, 4],
		[12, 4],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'width',
	objectId: 0x4,
	emptyBank: 1,

	resources: {
		FullerFlowerBush: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x224,
					0x2aa,
					0x370,
					0x3d4,
					0x1f4,
					0x29a,
					0x37f,
					0x35fd,
					0x467f,
					0x5b1f,
					0x3600,
					0x4aa5,
					0x5b29,
				],
			],

			romOffset: 0x163768,
			tiles: [
				[596, 594],
				[593, 595],
			],
		},
		FullerFlowerBushLeft: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x224,
					0x2aa,
					0x370,
					0x3d4,
					0x1f4,
					0x29a,
					0x37f,
					0x35fd,
					0x467f,
					0x5b1f,
					0x3600,
					0x4aa5,
					0x5b29,
				],
			],

			romOffset: 0x163768,
			tiles: [
				[592, 594],
				[593, 595],
			],
		},
		FullerFlowerBushRight: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x224,
					0x2aa,
					0x370,
					0x3d4,
					0x1f4,
					0x29a,
					0x37f,
					0x35fd,
					0x467f,
					0x5b1f,
					0x3600,
					0x4aa5,
					0x5b29,
				],
			],

			romOffset: 0x163768,
			tiles: [
				[596, 598],
				[593, 595],
			],
		},
	},

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Width(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="FullerFlowerBush-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ entity, room }) {
		const hasBushToLeft = isBushToLeft(entity, room);
		const hasBushToRight = isBushToRight(entity, room);

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div
				style={style}
				className={clsx({
					'FullerFlowerBushLeft-bg': !hasBushToLeft,
					'FullerFlowerBushRight-bg': !hasBushToRight,
					'FullerFlowerBush-bg': hasBushToLeft && hasBushToRight,
				})}
			/>
		);
	},

	getWarning({ entity, room }) {
		const hasBushToLeft = isBushToLeft(entity, room);
		const hasBushToRight = isBushToRight(entity, room);

		if (!hasBushToLeft && !hasBushToRight) {
			return 'Needs to be at least 2 tiles wide';
		}
	},
};

export { FullerFlowerBush };
