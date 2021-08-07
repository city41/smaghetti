import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets } from './util';

function isBurnerAbove(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellAbove = room.stage.matrix[entity.y - 1]?.[entity.x];

	return cellAbove?.type === 'Burner';
}

const Burner: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-airship',
		title: 'Burner',
		description: 'Shoots fire',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: [0, -1, -1, -1, -1, -1],
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x2,
	emptyBank: 0,

	resource: {
		romOffset: 0x176be8,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x39ce,
				0x4a52,
				0x6318,
				0x77bd,
				0x267c,
				0x435f,
				0x5bbf,
				0x3d89,
				0x4a0d,
				0x5650,
				0x62b2,
				0x6f15,
				0x7778,
			],
		],
		tiles: [
			[686, 687],
			[686, 687],
		],
	},

	toSpriteBinary({ x, y, entity, room }) {
		if (isBurnerAbove(entity, room)) {
			return [];
		}

		// the flame itself
		return [0, 0x9d, x, y - 3];
	},

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};
		return <div className="Burner-bg bg-cover" style={style} />;
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Burner };
