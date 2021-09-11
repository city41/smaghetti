import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, parseCellObjectsParam1Width } from './util';

function getHeight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): number {
	if (!entity || !room) {
		return 2;
	}

	const ty = entity.y / TILE_SIZE;

	return Math.max(1, room.roomTileHeight - ty);
}

/**
 * these need object priorities implemented before they can be used effectively
 */
const WoodColumnWide: Entity = {
	paletteInfo: {
		title: 'Wood Column - Wide',
		warning:
			"Smaghetti needs the object priorities feature before these can work as you'd expect",
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x5,
	emptyBank: 1,
	width: 2,

	resources: {
		WoodColumnWideTop: {
			palettes: [
				[
					32662,
					32767,
					0,
					17932,
					23185,
					28469,
					32731,
					8378,
					8606,
					15007,
					304,
					435,
					6711,
					11931,
					16158,
					19359,
				],
			],
			tiles: [
				[266, 267, 268, 269],
				[298, 299, 300, 301],
			],
			romOffset: 1501760,
		},
		WoodColumnWideBody: {
			palettes: [
				[
					32662,
					32767,
					0,
					17932,
					23185,
					28469,
					32731,
					8378,
					8606,
					15007,
					304,
					435,
					6711,
					11931,
					16158,
					19359,
				],
			],
			tiles: [
				[282, 283, 284, 285],
				[298, 299, 300, 301],
				[314, 315, 316, 317],
				[270, 271, 302, 303],
			],
			romOffset: 1501760,
		},
	},

	toObjectBinary({ x, y }) {
		return [0x40, y, x, this.objectId, 0];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Width(data, offset, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};

		const topStyle = {
			width: (size / 3) * 2,
			height: size / 2,
		};

		const bodyStyle = {
			width: (size / 3) * 2,
			height: (size / 3) * 2,
		};

		return (
			<div className="flex flex-col items-center" style={style}>
				<div className="WoodColumnWideTop-bg bg-cover" style={topStyle} />
				<div className="WoodColumnWideBody-bg bg-cover" style={bodyStyle} />
			</div>
		);
	},

	render({ entity, room }) {
		const height = getHeight(entity, room);

		const style = {
			width: 2 * TILE_SIZE,
			height: height * TILE_SIZE,
		};

		const topStyle = {
			width: 2 * TILE_SIZE,
			height: TILE_SIZE,
		};

		const bodyStyle = {
			width: 2 * TILE_SIZE,
			height: (height - 1) * TILE_SIZE,
		};

		return (
			<div className="flex flex-col" style={style}>
				<div className="WoodColumnWideTop-bg" style={topStyle} />
				<div className="WoodColumnWideBody-bg bg-repeat-y" style={bodyStyle} />
			</div>
		);
	},
};

export { WoodColumnWide };
