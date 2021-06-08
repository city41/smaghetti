import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

function isPlatformToLeft(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellToLeft = room.stage.matrix[entity.y]?.[entity.x - 1];

	if (!cellToLeft) {
		return false;
	}

	return cellToLeft.type === 'StretchBooPlatform';
}

function isPlatformToRight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellToRight = room.stage.matrix[entity.y]?.[entity.x + 1];

	if (!cellToRight) {
		return false;
	}

	return cellToRight.type === 'StretchBooPlatform';
}

const StretchBooPlatform: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Stretch Boo Platform',
		description: 'This is the floor Stretch Boos are normally placed on',
	},

	objectSets: encodeObjectSets([[2, 2]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'width',
	objectId: 0xa,
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x65a3,
			0x7a8b,
			0x7f6e,
			0x7fd6,
			0x1594,
			0x2e39,
			0x42bd,
			0x11,
			0x16,
			0x1a,
			0xdbe,
			0x123f,
			0x2bf,
		],
		romOffset: 0x167674,
		tiles: [
			[14, 14],
			[15, 15],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="StretchBooPlatform-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(_showDetails, _settings, _onSettingsChange, entity, room) {
		const platformToLeft = isPlatformToLeft(entity, room);
		const platformToRight = isPlatformToRight(entity, room);

		const style = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div
				style={style}
				className={clsx({
					'StretchBooPlatform-bg':
						(platformToLeft && platformToRight) || !entity,
					'StretchBooPlatformLeft-bg': !platformToLeft && !!entity,
					'StretchBooPlatformRight-bg': !platformToRight && !!entity,
				})}
			/>
		);
	},

	getWarning(_settings, entity, room) {
		const platformToLeft = isPlatformToLeft(entity, room);
		const platformToRight = isPlatformToRight(entity, room);

		if (!platformToRight && !platformToLeft) {
			return 'Needs to be at least 2 tiles wide';
		}
	},
};

export { StretchBooPlatform };
