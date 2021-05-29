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

function isOneWide(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellToLeft = room.stage.matrix[entity.y]?.[entity.x - 1];
	const cellToRight = room.stage.matrix[entity.y]?.[entity.x + 1];

	return cellToLeft?.type !== 'WoodFloor' && cellToRight?.type !== 'WoodFloor';
}

const WoodFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
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
		palette: [
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
		const oneWide = isOneWide(entity, room);

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
			>
				{oneWide && <div className="border border-red-500 w-full h-full" />}
			</div>
		);
	},
};

export { WoodFloor };
