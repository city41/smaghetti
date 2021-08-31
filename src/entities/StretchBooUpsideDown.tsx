import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';
import { parseSimpleSprite } from './util';

function isAttached(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const tx = entity.x / TILE_SIZE;
	const ty = entity.y / TILE_SIZE;

	const above = room.stage.matrix[ty - 1]?.[tx];

	if (above?.type === 'StretchBooPlatform') {
		const aboveLeft = room.stage.matrix[ty - 1]?.[tx - 1];
		const aboveRight = room.stage.matrix[ty - 1]?.[tx + 1];

		if (
			aboveLeft?.type === 'StretchBooPlatform' &&
			aboveRight?.type === 'StretchBooPlatform'
		) {
			return true;
		}
	}

	return false;
}

const StretchBooUpsideDown: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Stretch Boo - Upside Down',
		description: 'Only works properly on Stretch Boo platforms',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [6, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x32,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(
			data,
			offset,
			0,
			this.objectId,
			'StretchBooUpsideDown'
		);
	},

	simpleRender(size) {
		return (
			<div
				className="StretchBoo-bg bg-cover transform rotate-180"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ entity, room }) {
		const attached = isAttached(entity, room);

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			marginTop: attached ? -5 : 0,
		};

		const spaceStyle = {
			top: attached ? -5 : 0,
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div
				className="relative StretchBoo-bg bg-cover transform rotate-180"
				style={style}
			>
				<TileSpace style={spaceStyle} className="absolute left-0" />
			</div>
		);
	},

	getWarning({ entity, room }) {
		const attached = isAttached(entity, room);

		if (!attached) {
			return 'Should be placed in the middle part of a Stretch platform';
		}
	},
};

export { StretchBooUpsideDown };
