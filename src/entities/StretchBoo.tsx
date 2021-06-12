import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

function isAttached(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const tx = entity.x / TILE_SIZE;
	const ty = entity.y / TILE_SIZE;

	const below = room.stage.matrix[ty + 1]?.[tx];

	if (below?.type === 'StretchBooPlatform') {
		const belowLeft = room.stage.matrix[ty + 1]?.[tx - 1];
		const belowRight = room.stage.matrix[ty + 1]?.[tx + 1];

		if (
			belowLeft?.type === 'StretchBooPlatform' &&
			belowRight?.type === 'StretchBooPlatform'
		) {
			return true;
		}
	}

	return false;
}

const StretchBoo: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Stretch Boo - Upright',
		description: 'Only works properly on Stretch Boo platforms',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [6, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x31,

	resource: {
		romOffset: 0x167674,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x39ce,
				0x4a52,
				0x5ef7,
				0x7a8b,
				0x7f6e,
				0x7fd6,
				0x6f7b,
				0x19f8,
				0x2e5c,
				0x42ff,
				0x1b1f,
				0x1a1f,
				0x1d,
			],
		],
		tiles: [
			[168, 169],
			[184, 185],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="StretchBoo-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(_showDetails, _settings, _onSettingsChange, entity, room) {
		const attached = isAttached(entity, room);

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			marginTop: attached ? 5 : 0,
		};

		const spaceStyle = {
			top: attached ? -5 : 0,
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div className="relative StretchBoo-bg bg-cover" style={style}>
				<TileSpace style={spaceStyle} className="absolute left-0" />
			</div>
		);
	},

	getWarning(
		_settings: EditorEntitySettings,
		entity: EditorEntity,
		room: RoomData
	) {
		const attached = isAttached(entity, room);

		if (!attached) {
			return 'Should be placed in the middle part of a Stretch platform';
		}
	},
};

export { StretchBoo };
