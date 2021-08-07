import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

function isCheckeredAbove(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellAbove = room.stage.matrix[entity.y - 1]?.[entity.x];

	return cellAbove?.type === 'CheckeredFloorPerspective';
}

function isMoreThanOneAbove(entity: EditorEntity, room: RoomData): boolean {
	const cellAbove = room.stage.matrix[entity.y - 1]?.[entity.x];
	const cellTwoAbove = room.stage.matrix[entity.y - 2]?.[entity.x];

	return (
		cellAbove?.type === 'CheckeredFloorPerspective' &&
		cellTwoAbove?.type === 'CheckeredFloorPerspective'
	);
}

const CheckeredFloorPerspective: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Checkered Floor - Perspective',
		warning:
			'This floor only looks correct when it is two tiles tall. This is a weird one.',
	},

	objectSets: encodeObjectSets([[2, 2]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x3b,
	emptyBank: 1,
	param1: 'height',
	param2: 'width',

	resource: {
		palettes: [
			[
				32662,
				32767,
				0,
				14798,
				19026,
				25368,
				30653,
				29484,
				32722,
				32763,
				3575,
				9852,
				17247,
				23487,
				0,
				0,
			],
			[
				32662,
				32767,
				0,
				26019,
				31371,
				32622,
				32726,
				5524,
				11833,
				17085,
				17,
				22,
				26,
				3518,
				4671,
				703,
			],
			[
				0,
				0,
				32767,
				24035,
				31400,
				5278,
				607,
				9055,
				8973,
				0,
				0,
				0,
				25535,
				0,
				0,
				0,
			],
		],
		tiles: [
			[13, 13, 12, 12],
			[
				46,
				46,
				{
					tileIndex: 47,
					palette: 1,
				},
				{
					tileIndex: 47,
					palette: 1,
				},
			],
			[
				{
					tileIndex: 47,
					palette: 1,
				},
				{
					tileIndex: 47,
					palette: 1,
				},
				46,
				46,
			],
			[
				{
					tileIndex: 78,
					palette: 2,
				},
				{
					tileIndex: 78,
					palette: 2,
				},
				{
					romOffset: 0xf0000,
					shift: 28,
					uncompressed: true,
					tileIndex: 311,
					palette: 1,
				},
				{
					romOffset: 0xf0000,
					shift: 28,
					uncompressed: true,
					tileIndex: 311,
					palette: 1,
				},
			],
		],
		romOffset: 1253344,
	},

	toObjectBinary({ x, y, w, h }) {
		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	simpleRender(size) {
		return (
			<div
				className="CheckeredFloorPerspective-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ entity, room }) {
		const style = { width: TILE_SIZE, height: TILE_SIZE };
		const checkeredAbove = isCheckeredAbove(entity, room);

		if (checkeredAbove) {
			return (
				<div style={style} className="grid grid-cols-2 grid-rows-2">
					<div className="bg-black" />
					<div className="bg-white" />
					<div className="bg-white" />
					<div className="bg-black" />
				</div>
			);
		} else {
			return this.simpleRender(TILE_SIZE);
		}
	},

	getWarning({ entity, room }) {
		const moreThanOneAbove = isMoreThanOneAbove(entity, room);

		if (moreThanOneAbove) {
			return 'This floor only looks correct when two tiles tall';
		}
	},
};

export { CheckeredFloorPerspective };
