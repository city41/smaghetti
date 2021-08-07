import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

function isSeaweedAbove(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellAbove = room.stage.matrix[entity.y - 1]?.[entity.x];

	return cellAbove?.type === 'Seaweed';
}

const Seaweed: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Seaweed',
		description: 'Acts a lil strange in non-water levels',
	},

	objectSets: encodeObjectSets([
		[6, 10],
		[6, 11],
		[6, 12],
		[6, 13],
		[6, 14],
		[6, 15],
		[6, 1],
		[6, 2],
		[6, 3],
		[6, 4],
		[6, 5],
		[6, 6],
		[6, 8],
		[6, 9],
		[8, 10],
		[8, 11],
		[8, 12],
		[8, 13],
		[8, 14],
		[8, 1],
		[8, 2],
		[8, 3],
		[8, 4],
		[8, 5],
		[8, 6],
		[8, 8],
		[8, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'y',
	param1: 'height',
	objectId: 0xc,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x460c,
				0x5a91,
				0x6f35,
				0x7fdb,
				0x5acf,
				0x6311,
				0x6f73,
				0x4160,
				0x4de0,
				0x5e40,
				0x6ec0,
			],
		],
		romOffset: 0x176be8,
		tiles: [
			[384, 385],
			[386, 387],
			[386, 387],
			[386, 387],
		],
	},

	toObjectBinary({ x, y, h }) {
		return [getBankParam1(1, h), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="Seaweed-bg"
				style={{ width: size, height: size, backgroundSize: '100%' }}
			/>
		);
	},

	render({ entity, room }) {
		const offset = isSeaweedAbove(entity, room) ? -TILE_SIZE : 0;

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundPositionY: offset,
		};
		return <div style={style} className="Seaweed-bg" />;
	},
};

export { Seaweed };
