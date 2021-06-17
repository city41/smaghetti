import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

function getHeight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
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

const WoodSupport: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Wood Support',
		description: 'Holds up the wood platforms. Purely decoration.',
	},

	objectSets: encodeObjectSets([
		[12, 12],
		[12, 4],
		[4, 12],
		[4, 4],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x4,
	emptyBank: 0,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x15d2,
				0x2257,
				0x2afc,
				0x37be,
				0x20ba,
				0x21be,
				0x32df,
				0x3192,
				0x1636,
				0x2a9c,
				0x42ff,
				0x0,
				0x0,
			],
		],
		romOffset: 0x163768,
		tiles: [
			[771, 772],
			[771, 772],
		],
	},

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="WoodSupport-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(_showDetails, _settings, _onSettingsChange, entity, room) {
		const height = getHeight(entity, room);

		const style = {
			width: TILE_SIZE,
			height: height * TILE_SIZE,
		};

		return (
			<div className="relative WoodSupport-bg" style={style}>
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

export { WoodSupport };
