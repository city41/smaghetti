import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, parseSimpleObject } from './util';
import { getEntityTileBounds, pointIsInside } from '../components/editor/util';

function getHeight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): number {
	if (!entity || !room) {
		return 1;
	}

	const tx = entity.x / TILE_SIZE;
	const ty = entity.y / TILE_SIZE;

	let height = 1;
	for (let y = ty + 1; y < room.roomTileHeight; ++y) {
		if (room.stage.matrix[y]?.[tx]) {
			return height;
		}

		if (
			room.stage.entities.some((e) => {
				const bounds = getEntityTileBounds(e);
				return pointIsInside({ x: tx, y }, bounds);
			})
		) {
			return height;
		}

		++height;
	}

	return height;
}

const ClassicColumn: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Classic Column',
	},

	objectSets: encodeObjectSets([[2, 2]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x1,
	emptyBank: 1,

	resources: {
		ClassicColumnSilverCap: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x39ce,
					0x4a52,
					0x6318,
					0x77bd,
					0x732c,
					0x7fd2,
					0x7ffb,
					0xdf7,
					0x267c,
					0x435f,
					0x5bbf,
					0x0,
					0x0,
				],
			],
			romOffset: 0x167674,
			tiles: [
				[68, 69],
				[72, 73],
			],
		},
		ClassicColumnSilverBody: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x39ce,
					0x4a52,
					0x6318,
					0x77bd,
					0x732c,
					0x7fd2,
					0x7ffb,
					0xdf7,
					0x267c,
					0x435f,
					0x5bbf,
					0x0,
					0x0,
				],
			],
			romOffset: 0x167674,
			tiles: [[72, 73]],
		},
		ClassicColumnSilverBase: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x39ce,
					0x4a52,
					0x6318,
					0x77bd,
					0x732c,
					0x7fd2,
					0x7ffb,
					0xdf7,
					0x267c,
					0x435f,
					0x5bbf,
					0x0,
					0x0,
				],
			],
			romOffset: 0x167674,
			tiles: [
				[72, 73],
				[70, 71],
			],
		},
	},

	toObjectBinary({ x, y }) {
		return [0x40, y, x, this.objectId];
	},

	parseObject(data, offset) {
		// TODO: this will only work for Smaghetti levels
		// for full compatibility, need to account for the parameter
		// which is "number of columns"
		return parseSimpleObject(data, offset, 0x40, this);
	},

	simpleRender(size) {
		return (
			<div
				className="ClassicColumnSilverCap-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ entity, room }) {
		const height = getHeight(entity, room);
		const touchesBottomOfRoom = !!(
			entity &&
			room &&
			entity.y / TILE_SIZE + height >= room.roomTileHeight
		);

		const style = {
			width: TILE_SIZE,
			height: height * TILE_SIZE,
		};

		const cap = (
			<div
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
				className="ClassicColumnSilverCap-bg bg-cover"
			/>
		);

		const bodyHeight = touchesBottomOfRoom ? height - 1 : height - 2;

		const body = (
			<div
				style={{ width: TILE_SIZE, height: bodyHeight * TILE_SIZE }}
				className="ClassicColumnSilverBody-bg bg-repeat-y"
			/>
		);
		const base = (
			<div
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
				className="ClassicColumnSilverBase-bg bg-cover"
			/>
		);

		return (
			<div style={style}>
				{cap}
				{height > 2 && body}
				{height > 1 && !touchesBottomOfRoom && base}
			</div>
		);
	},
};

export { ClassicColumn };
