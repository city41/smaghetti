import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

type Orientation = 'up' | 'down';

function getOrientation(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): Orientation | null {
	if (!entity || !room) {
		return null;
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
			return 'up';
		}
	}

	const above = room.stage.matrix[ty - 1]?.[tx];

	if (above?.type === 'StretchBooPlatform') {
		const aboveLeft = room.stage.matrix[ty - 1]?.[tx - 1];
		const aboveRight = room.stage.matrix[ty - 1]?.[tx + 1];

		if (
			aboveLeft?.type === 'StretchBooPlatform' &&
			aboveRight?.type === 'StretchBooPlatform'
		) {
			return 'down';
		}
	}

	return null;
}

const orientationToObjectID: Record<Orientation, number> = {
	up: 0x31,
	down: 0x32,
};

const StretchBoo: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Stretch Boo',
		description: 'Only works properly on Stretch Boo platforms',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [6, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x31,
	alternateObjectIds: [0x32],

	resource: {
		romOffset: 0x167674,
		palette: [
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
		tiles: [
			[168, 169],
			[184, 185],
		],
	},

	toSpriteBinary(x, y, _w, _h, _settings, entity, room) {
		const orientation = getOrientation(entity, room) ?? 'up';
		const objectId = orientationToObjectID[orientation];
		return [0, objectId, x, y];
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
		const orientation = getOrientation(entity, room) ?? 'up';

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			marginTop: orientation === 'up' ? 5 : -5,
		};

		const spaceStyle = {
			top: -5,
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div
				className={clsx('relative StretchBoo-bg bg-cover', {
					'transform rotate-180': orientation === 'down',
				})}
				style={style}
			>
				<TileSpace style={spaceStyle} className="absolute left-0" />
			</div>
		);
	},

	getWarning(
		_settings: EditorEntitySettings,
		entity: EditorEntity,
		room: RoomData
	) {
		const orientation = getOrientation(entity, room);

		if (!orientation) {
			return 'Should be placed in the middle part of a Stretch platform';
		}
	},
};

export { StretchBoo };
