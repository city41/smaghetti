import React from 'react';
import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

function shouldBeInShadow(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellAbove = room.stage.matrix[entity.y - 1]?.[entity.x];

	if (!cellAbove || cellAbove.type === 'StoneSupport') {
		return false;
	}

	return true;
}

function getPosition(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): number {
	if (!entity || !room) {
		return 0;
	}

	let position = -1;
	let i = 0;

	while (room.stage.matrix[entity.y - i]?.[entity.x]?.type === 'StoneSupport') {
		i += 1;
		position += 1;
	}

	return position;
}

const StoneSupport: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Stone Support',
		description: 'Holds up the wood bridges. Purely decoration.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'y',
	objectId: 0x6d,
	alternateObjectIds: [0x62],
	emptyBank: 1,
	param1: 'height',

	resource: {
		palettes: [
			[
				0x7ffb,
				0x7fff,
				0x0,
				0x575d,
				0x169a,
				0x1237,
				0xdd3,
				0x36b8,
				0x2633,
				0x15b0,
				0x12c,
				0x12c,
				0x3ebf,
				0x2e3d,
				0x19d9,
				0x155,
			],
		],
		romOffset: 0x1cf558,
		tiles: [
			[3, 4],
			[19, 24],
			[7, 20],
			[19, 8],
			[23, 20],
			[19, 24],
			[7, 20],
			[19, 8],
		],
	},

	toObjectBinary(x, y, _w, h, _settings, entity, room) {
		if (shouldBeInShadow(entity, room)) {
			if (h === 0) {
				return [getBankParam1(1, 0), y, x, this.objectId];
			} else {
				return [
					getBankParam1(1, 0),
					y,
					x,
					this.objectId,
					getBankParam1(1, h),
					y + 1,
					x,
					this.objectId,
				];
			}
		} else {
			return [getBankParam1(1, h + 1), y, x, this.objectId];
		}
	},

	simpleRender(size) {
		return (
			<div
				className="StoneSupport-bg bg-cover"
				style={{ width: size, height: size, backgroundPositionY: -size }}
			/>
		);
	},

	render(_showDetails, _settings, _osc, entity, room) {
		const position = getPosition(entity, room);
		const offset = shouldBeInShadow(entity, room) ? 0 : (position % 3) + 1;

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundPositionY: -offset * TILE_SIZE,
		};
		return <div style={style} className="StoneSupport-bg" />;
	},
};

export { StoneSupport };
