import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, parseObjectIdMapObject } from './util';
import { getEntityTileBounds, pointIsInside } from '../components/editor/util';
import { HammerButton } from './detailPanes/HammerButton';
import { TileSpace } from './TileSpace';
import invert from 'lodash/invert';

const colors = ['silver', 'blue'] as const;

type Color = typeof colors[number];

const colorToObjectId: Record<Color, number> = {
	silver: 1,
	blue: 0,
};

const objectIdToColor = invert(colorToObjectId) as Record<number, Color>;

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
	alternateObjectIds: Object.values(colorToObjectId),
	emptyBank: 1,
	settingsType: 'single',
	defaultSettings: {
		color: 'silver',
	},

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
		ClassicColumnBlueCap: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x460c,
					0x5a91,
					0x6f35,
					0x7fdb,
					0x0,
					0x0,
					0x0,
					0x20ba,
					0x15bf,
					0x2a9f,
					0x435f,
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
		ClassicColumnBlueBody: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x460c,
					0x5a91,
					0x6f35,
					0x7fdb,
					0x0,
					0x0,
					0x0,
					0x20ba,
					0x15bf,
					0x2a9f,
					0x435f,
					0x0,
					0x0,
				],
			],
			romOffset: 0x167674,
			tiles: [[72, 73]],
		},
		ClassicColumnBlueBase: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x460c,
					0x5a91,
					0x6f35,
					0x7fdb,
					0x0,
					0x0,
					0x0,
					0x20ba,
					0x15bf,
					0x2a9f,
					0x435f,
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

	toObjectBinary({ x, y, settings }) {
		const color = (settings.color ?? this.defaultSettings!.color) as Color;
		const objectId = colorToObjectId[color];

		return [0x40, y, x, objectId];
	},

	parseObject(data, offset) {
		return parseObjectIdMapObject(
			data,
			offset,
			0x40,
			objectIdToColor,
			'color',
			this
		);
	},

	simpleRender(size) {
		return (
			<div
				className="ClassicColumnSilverCap-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ entity, room, settings, onSettingsChange }) {
		const color = (settings.color ?? this.defaultSettings!.color) as Color;

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
				className={clsx('bg-cover', {
					'ClassicColumnSilverCap-bg': color === 'silver',
					'ClassicColumnBlueCap-bg': color === 'blue',
				})}
			/>
		);

		const bodyHeight = touchesBottomOfRoom ? height - 1 : height - 2;

		const body = (
			<div
				style={{ width: TILE_SIZE, height: bodyHeight * TILE_SIZE }}
				className={clsx('bg-repeat-y', {
					'ClassicColumnSilverBody-bg': color === 'silver',
					'ClassicColumnBlueBody-bg': color === 'blue',
				})}
			/>
		);
		const base = (
			<div
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
				className={clsx('bg-cover', {
					'ClassicColumnSilverBase-bg': color === 'silver',
					'ClassicColumnBlueBase-bg': color === 'blue',
				})}
			/>
		);

		return (
			<div style={style} className="relative">
				{!!entity && (
					<>
						<TileSpace
							className="absolute top-0 left-0"
							style={{ width: TILE_SIZE, height: TILE_SIZE }}
						/>
						<HammerButton
							values={colors}
							currentValue={color}
							onNewValue={(newColor) => {
								onSettingsChange({ color: newColor });
							}}
						/>
					</>
				)}
				{(height > 1 || !entity) && cap}
				{height > 2 && body}
				{!touchesBottomOfRoom && entity && base}
			</div>
		);
	},
};

export { ClassicColumn };
