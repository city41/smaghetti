import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

function isRopeToRight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return true;
	}

	const cellToRight = room.stage.matrix[entity.y]?.[entity.x + 1];

	if (!cellToRight) {
		return false;
	}

	return cellToRight.type === 'RopeRailing';
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

	return (
		cellToLeft?.type !== 'RopeRailing' && cellToRight?.type !== 'RopeRailing'
	);
}

const RopeRailing: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Rope Railing',
		description: 'Safety first on air ships',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'width',
	objectId: 0x2e,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x39ce,
				0x4a52,
				0x5ef7,
				0x7a8b,
				0x7f6e,
				0x7fd6,
				0x6f7b,
				0x19f8,
				0x2e5c,
				0x42ff,
				0x1b1f,
				0x1a1f,
				0x1d,
			],
		],
		romOffset: 0x176be8,
		tiles: [
			[692, 693],
			[695, 767],
		],
	},

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Width(data, offset, this);
	},

	simpleRender(size) {
		const bgSize = (42 / 50) * 100;
		const style = { width: size, height: size, backgroundSize: `${bgSize}%` };

		return <div className="RopeRailing-bg bg-repeat-x" style={style} />;
	},

	render({ entity, room }) {
		const ropeToRight = isRopeToRight(entity, room);
		const oneWide = isOneWide(entity, room);

		const style = {
			width: ropeToRight || oneWide ? TILE_SIZE : 3,
			height: TILE_SIZE,
		};

		return <div className="RopeRailing-bg bg-no-repeat" style={style} />;
	},

	getProblem({ entity, room }) {
		if (isOneWide(entity, room)) {
			return {
				severity: 'error',
				message: 'Must be at least 2 tiles wide',
			} as const;
		}
	},
};

export { RopeRailing };
