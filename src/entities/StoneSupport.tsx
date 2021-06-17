import React from 'react';
import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

function getPosition(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): number {
	if (!entity || !room) {
		return 0;
	}

	let position = -1;
	let i = 0;

	while (room.stage.matrix[entity.y - i]?.[entity.x]?.type === 'StoneSupport') {
		i += 1;
		position += 1;
	}

	return position;
}

const StoneSupport: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Stone Support',
		description: 'Holds up the wood bridges. Purely decoration.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'y',
	objectId: 0x6d,
	emptyBank: 0,

	resource: {
		palettes: [
			[
				0x7ffb,
				0x7fff,
				0x0,
				0x575d,
				0x169a,
				0x1237,
				0xdd3,
				0x36b8,
				0x2633,
				0x15b0,
				0x12c,
				0x12c,
				0x3ebf,
				0x2e3d,
				0x19d9,
				0x155,
			],
		],
		romOffset: 0x1cf558,
		tiles: [
			[7, 20],
			[19, 8],
			[23, 20],
			[19, 24],
			[7, 20],
			[19, 8],
		],
	},

	toObjectBinary(x, y, _w, h) {
		return [getBankParam1(1, h + 1), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="StoneSupport-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(_showDetails, _settings, _osc, entity, room) {
		const position = getPosition(entity, room);
		const offset = position % 3;

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundPositionY: -offset * TILE_SIZE,
		};
		return <div style={style} className="StoneSupport-bg" />;
	},
};

export { StoneSupport };
