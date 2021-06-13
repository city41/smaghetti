import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

function isCorner(
	dx: number,
	dy: number,
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const yCell = room.stage.matrix[entity.y + dy]?.[entity.x];
	const xCell = room.stage.matrix[entity.y]?.[entity.x + dx];

	return yCell?.type !== 'UnderwaterFloor' && xCell?.type !== 'UnderwaterFloor';
}

function isUpperLeft(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	return isCorner(-1, -1, entity, room);
}

function isUpperRight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	return isCorner(1, -1, entity, room);
}

function isLowerLeft(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const toLeft = room.stage.matrix[entity.y]?.[entity.x - 1];

	if (toLeft?.type === 'UnderwaterFloor') {
		return false;
	}

	let height = 0;
	let y = entity.y;

	while (room.stage.matrix[y]?.[entity.x]?.type === 'UnderwaterFloor') {
		height += 1;
		y -= 1;
	}

	return height >= 2;
}

function isLowerRight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const toRight = room.stage.matrix[entity.y]?.[entity.x + 1];

	if (toRight?.type === 'UnderwaterFloor') {
		return false;
	}

	let height = 0;
	let y = entity.y;

	while (room.stage.matrix[y]?.[entity.x]?.type === 'UnderwaterFloor') {
		height += 1;
		y -= 1;
	}

	return height >= 2;
}

function isLeft(entity: EditorEntity | undefined, room: RoomData | undefined) {
	if (!entity || !room) {
		return false;
	}

	if (isLowerLeft(entity, room) || isUpperLeft(entity, room)) {
		return false;
	}

	const toLeft = room.stage.matrix[entity.y]?.[entity.x - 1];
	return toLeft?.type !== 'UnderwaterFloor';
}

function isRight(entity: EditorEntity | undefined, room: RoomData | undefined) {
	if (!entity || !room) {
		return false;
	}

	if (isLowerRight(entity, room) || isUpperRight(entity, room)) {
		return false;
	}

	const toRight = room.stage.matrix[entity.y]?.[entity.x + 1];
	return toRight?.type !== 'UnderwaterFloor';
}

function isTop(entity: EditorEntity | undefined, room: RoomData | undefined) {
	if (!entity || !room) {
		return false;
	}

	if (isUpperLeft(entity, room) || isUpperRight(entity, room)) {
		return false;
	}

	const toTop = room.stage.matrix[entity.y - 1]?.[entity.x];
	return toTop?.type !== 'UnderwaterFloor';
}

function isBottom(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
) {
	if (!entity || !room) {
		return false;
	}

	if (isLowerLeft(entity, room) || isLowerRight(entity, room)) {
		return false;
	}

	let height = 0;
	let y = entity.y;

	while (room.stage.matrix[y]?.[entity.x]?.type === 'UnderwaterFloor') {
		height += 1;
		y -= 1;
	}

	return height >= 2;
}

const UnderwaterFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Underwater Floor',
		description: 'Intended for underwater levels, but can be used anywhere',
		warning:
			'Creating strange shapes with underwater floor can cause your level to get all messed up. I will change how this one works altogether, stay tuned...',
	},

	objectSets: encodeObjectSets([
		[6, 5],
		[6, 6],
		[6, 8],
		[8, 5],
		[8, 6],
		[8, 8],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	param1: 'height',
	param2: 'width',
	objectId: 0x31,
	emptyBank: 1,

	// TODO: this only exists for hex-tree. hex-tree really should use render()
	resource: {
		romOffset: 0x16ad5c,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x356b,
				0x4610,
				0x5a94,
				0x6b18,
				0x732c,
				0x7fd2,
				0x7ffb,
				0x59c9,
				0x6a51,
				0x7ad8,
				0x7f5c,
				0x29a,
				0x37f,
			],
		],
		tiles: [
			[510, 510],
			[510, 510],
		],
	},

	toObjectBinary(x, y, w, h) {
		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	simpleRender(size) {
		const style = { width: size, height: size };

		const cornerStyle = { width: size / 2, height: size / 2 };

		return (
			<div style={style} className="grid grid-cols-2 grid-rows-2">
				<div
					style={cornerStyle}
					className="UnderwaterFloorUpperLeft-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="UnderwaterFloorUpperRight-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="UnderwaterFloorLowerLeft-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="UnderwaterFloorLowerRight-bg bg-cover"
				/>
			</div>
		);
	},

	render(_showDetails, _settings, _osc, entity, room) {
		if (!entity) {
			return this.simpleRender(TILE_SIZE);
		}

		const upperLeft = isUpperLeft(entity, room);
		const upperRight = isUpperRight(entity, room);
		const lowerLeft = isLowerLeft(entity, room);
		const lowerRight = isLowerRight(entity, room);
		const left = isLeft(entity, room);
		const right = isRight(entity, room);
		const top = isTop(entity, room);
		const bottom = isBottom(entity, room);

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div
				style={style}
				className={clsx({
					'UnderwaterFloorUpperLeft-bg': upperLeft,
					'UnderwaterFloorUpperRight-bg': upperRight,
					'UnderwaterFloorLowerLeft-bg': lowerLeft,
					'UnderwaterFloorLowerRight-bg': lowerRight,
					'UnderwaterFloorLeft-bg': left,
					'UnderwaterFloorRight-bg': right,
					'UnderwaterFloorTop-bg': top,
					'UnderwaterFloorBottom-bg': bottom,
				})}
			/>
		);
	},

	getWarning(_settings, entity, room) {
		const leftCell = room.stage.matrix[entity.y]?.[entity.x - 1];
		const rightCell = room.stage.matrix[entity.y]?.[entity.x + 1];

		if (
			leftCell?.type !== 'UnderwaterFloor' &&
			rightCell?.type !== 'UnderwaterFloor'
		) {
			return 'Needs to be at least 2 tiles wide';
		}
	},
};

export { UnderwaterFloor };
