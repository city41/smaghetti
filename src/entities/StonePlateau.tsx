import React from 'react';
import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1WidthEntityObject,
} from './util';
import { ANY_SPRITE_GRAPHIC_SET, OBJECT_PRIORITY_MIDDLE } from './constants';
import { ResizableRect } from '../components/ResizableRect';
import { TileSpace } from './TileSpace';
import { TILE_SIZE } from '../tiles/constants';

const RECT_CLASSES = [
	[
		'StonePlateauUpperLeft-bg',
		'StonePlateauUpperCenter-bg',
		'StonePlateauUpperRight-bg',
	],
	[
		'StonePlateauLowerLeft-bg',
		'StonePlateauLowerCenter-bg',
		'StonePlateauLowerRight-bg',
	],
	[
		'StonePlateauLowerLeft-bg',
		'StonePlateauLowerCenter-bg',
		'StonePlateauLowerRight-bg',
	],
];

const palette = [
	31744,
	32767,
	0,
	14798,
	19026,
	25368,
	30653,
	29484,
	32722,
	32763,
	5586,
	8791,
	11004,
	14270,
	0,
	0,
];

function getSupportingFloor(
	entity: EditorEntity,
	room: RoomData
): EditorEntity | null {
	if (!entity || !room) {
		return null;
	}

	const ety = entity.y / TILE_SIZE;
	const etx = entity.x / TILE_SIZE;

	const floorThatMatches = room.stage.entities.find((f) => {
		if (f.type !== 'UnderwaterFloor') {
			return false;
		}

		const fty = f.y / TILE_SIZE;

		if (fty <= ety) {
			return false;
		}

		const floorWidth = (f.settings?.width ?? 2) as number;
		const ftx = f.x / TILE_SIZE;

		if (ftx <= etx && ftx + floorWidth >= etx + 2) {
			return true;
		}
	});

	return floorThatMatches ?? null;
}

export function getHeight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): number {
	if (!entity || !room) {
		return 2;
	}

	const ety = entity.y / TILE_SIZE;

	const floorThatMatches = getSupportingFloor(entity, room);

	if (!floorThatMatches) {
		return room.roomTileHeight - ety;
	}

	const wfty = floorThatMatches.y / TILE_SIZE;
	return wfty - ety;
}

const StonePlateau: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Stone Plateau',
		description: 'Needs to be placed on top of underwater floor',
	},

	objectSets: encodeObjectSets([[8, 6]]),
	objectPriority: OBJECT_PRIORITY_MIDDLE + 1,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { width: 3 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x30,
	emptyBank: 1,

	resources: {
		StonePlateauUpperLeft: {
			palettes: [palette],
			tiles: [
				[
					{
						romOffset: 1550484,
						tileIndex: 564,
					},
					{
						romOffset: 1550484,
						tileIndex: 565,
					},
				],
				[
					{
						romOffset: 1550484,
						tileIndex: 602,
					},
					253,
				],
			],
			romOffset: 1584308,
		},
		StonePlateauUpperCenter: {
			palettes: [palette],
			tiles: [
				[
					{
						romOffset: 1550484,
						tileIndex: 566,
					},
					{
						romOffset: 1550484,
						tileIndex: 565,
					},
				],
				[254, 253],
			],
			romOffset: 1584308,
		},
		StonePlateauUpperRight: {
			palettes: [palette],
			tiles: [
				[
					{
						romOffset: 1550484,
						tileIndex: 566,
					},
					{
						romOffset: 1550484,
						tileIndex: 567,
					},
				],
				[253, 255],
			],
			romOffset: 1584308,
		},
		StonePlateauLowerLeft: {
			palettes: [palette],
			tiles: [
				[
					{
						romOffset: 1550484,
						tileIndex: 602,
					},
					238,
				],
				[
					{
						romOffset: 1550484,
						tileIndex: 603,
					},
					254,
				],
			],
			romOffset: 1584308,
		},
		StonePlateauLowerCenter: {
			palettes: [palette],
			tiles: [
				[237, 238],
				[253, 254],
			],
			romOffset: 1584308,
		},
		StonePlateauLowerRight: {
			palettes: [palette],
			tiles: [
				[237, 239],
				[253, 255],
			],
			romOffset: 1584308,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;
		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseParam1WidthEntityObject(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size };

		const cornerStyle = { width: size / 2, height: size / 2 };

		return (
			<div style={style} className="grid grid-cols-2 grid-rows-2">
				<div
					style={cornerStyle}
					className="StonePlateauUpperLeft-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="StonePlateauUpperRight-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="StonePlateauLowerLeft-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="StonePlateauLowerRight-bg bg-cover"
				/>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity, room }) {
		const height = getHeight(entity, room);
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		return (
			<ResizableRect
				className="relative"
				width={width}
				height={height}
				styles={RECT_CLASSES}
				axis="x"
				hideResizer={!entity}
				minW={2}
				minH={2}
				onSizeChange={(width) => onSettingsChange({ width })}
			>
				{!!entity && (
					<>
						<TileSpace
							className="absolute left-0 top-0 w-full"
							style={{ height: TILE_SIZE }}
						/>
					</>
				)}
			</ResizableRect>
		);
	},

	getProblem({ entity, room }) {
		const supportingWoodFloor = getSupportingFloor(entity, room);

		if (!supportingWoodFloor) {
			return {
				severity: 'error',
				message:
					'The left side (two tiles wide) must be over an underwater floor',
			};
		}
	},
};

export { StonePlateau };
