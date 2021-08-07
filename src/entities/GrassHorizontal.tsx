import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

function isGrassAbove(
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

	return cellAbove.type === 'GrassHorizontal';
}

const GrassHorizontal: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Grass - Horizontal',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	param1: 'height',
	param2: 'width',
	objectId: 0x43,
	emptyBank: 1,
	objectSets: encodeObjectSets([[14, 3]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x22d,
				0x1271,
				0x26f5,
				0x3779,
				0x6623,
				0x7b2e,
				0x7fd6,
				0x1132,
				0x1996,
				0x263b,
				0x2e9e,
			],
		],
		tiles: [
			[
				{ romOffset: 0x167674, tileIndex: 782 },
				{ romOffset: 0x167674, tileIndex: 783 },
			],
			[
				{ romOffset: 0x182cb4, tileIndex: 272 },
				{ romOffset: 0x182cb4, tileIndex: 273 },
			],
		],
	},

	toObjectBinary({ x, y, w, h }) {
		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	simpleRender(size) {
		return (
			<div
				className="GrassHorizontal-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ entity, room }) {
		const grassAbove = isGrassAbove(entity, room);
		return (
			<div
				className={clsx('bg-cover', {
					'GrassHorizontal-bg': !grassAbove,
					'GrassHorizontalDirt-bg': grassAbove,
				})}
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
			/>
		);
	},
};

export { GrassHorizontal };
