import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';
import { RoomState } from '../../components/make/editorSlice';
import { TileSpace } from '../TileSpace';

function getHeight(
	entity: EditorEntity | undefined,
	room: RoomState | undefined
): number {
	if (!entity || !room) {
		return 1;
	}

	let height = 1;
	const x = entity.x / TILE_SIZE;
	let y = entity.y / TILE_SIZE + 1;

	while (
		y < room.roomTileHeight &&
		!room.stage.matrix[y]?.[x] &&
		!room.actors.matrix[y]?.[x]
	) {
		y += 1;
		height += 1;
	}

	return height;
}

const Vine: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Vine',
		description: 'These grow downward until they hit something',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x87,
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x224,
			0x2aa,
			0x370,
			0x3d4,
			0x1f4,
			0x29a,
			0x37f,
			0x35fd,
			0x467f,
			0x5b1f,
			0x3600,
			0x4aa5,
			0x5b29,
		],
		romOffset: 0x16ea40,
		tiles: [
			[964, 966],
			[964, 966],
		],
	},

	toObjectBinary(x, y) {
		return [0x40, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div className="Vine-bg bg-cover" style={{ width: size, height: size }} />
		);
	},

	render(_showDetails, _settings, _onSettingsChange, entity, room) {
		const height = getHeight(entity, room);

		const style = {
			width: TILE_SIZE,
			height: height * TILE_SIZE,
		};

		return (
			<div className="relative Vine-bg" style={style}>
				<div
					style={{ width: TILE_SIZE, height: TILE_SIZE }}
					className="absolute top-0 left-0"
				>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { Vine };
