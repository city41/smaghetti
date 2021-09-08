import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets, parseSimpleObjectWithWidth } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

function isFloorToLeft(
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

	return cellToLeft.type === 'WoodFloorSnowCovered';
}

function isFloorToRight(
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

	return cellToRight.type === 'WoodFloorSnowCovered';
}

const WoodFloorSnowCovered: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-winter',
		title: 'Wood Floor - Snow Covered',
	},

	objectSets: encodeObjectSets([[12, 12]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'ignored',
	param2: 'width',
	objectId: 0x0,
	emptyBank: 1,

	resources: {
		WoodFloorSnowCoveredLeft: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x17b,
					0x1a1f,
					0x329f,
					0x4b7f,
					0x19f8,
					0x2e5c,
					0x42ff,
					0x3192,
					0x1636,
					0x2a9c,
					0x42ff,
					0x7f16,
					0x7fb9,
				],
			],
			romOffset: 0x167674,
			tiles: [
				[572, 574],
				[573, 575],
			],
		},
		WoodFloorSnowCovered: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x17b,
					0x1a1f,
					0x329f,
					0x4b7f,
					0x19f8,
					0x2e5c,
					0x42ff,
					0x3192,
					0x1636,
					0x2a9c,
					0x42ff,
					0x7f16,
					0x7fb9,
				],
			],
			romOffset: 0x167674,
			tiles: [
				[574, 574],
				[575, 575],
			],
		},
		WoodFloorSnowCoveredRight: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x17b,
					0x1a1f,
					0x329f,
					0x4b7f,
					0x19f8,
					0x2e5c,
					0x42ff,
					0x3192,
					0x1636,
					0x2a9c,
					0x42ff,
					0x7f16,
					0x7fb9,
				],
			],
			romOffset: 0x167674,
			tiles: [
				[574, 558],
				[575, 559],
			],
		},
		WoodFloorSnowCoveredThumbnail: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x17b,
					0x1a1f,
					0x329f,
					0x4b7f,
					0x19f8,
					0x2e5c,
					0x42ff,
					0x3192,
					0x1636,
					0x2a9c,
					0x42ff,
					0x7f16,
					0x7fb9,
				],
			],
			romOffset: 0x167674,
			tiles: [
				[572, 558],
				[573, 559],
			],
		},
	},

	toObjectBinary({ x, y, w }) {
		return [0x40, y, x, this.objectId, w];
	},

	parseObject(data, offset) {
		return parseSimpleObjectWithWidth(data, offset, 0x40, this);
	},

	simpleRender(size) {
		return (
			<div
				className="WoodFloorSnowCoveredThumbnail-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ entity, room }) {
		if (!entity) {
			return this.simpleRender(TILE_SIZE);
		}

		const platformToLeft = isFloorToLeft(entity, room);
		const platformToRight = isFloorToRight(entity, room);

		const style = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div
				style={style}
				className={clsx({
					'WoodFloorSnowCovered-bg':
						(platformToLeft && platformToRight) || !entity,
					'WoodFloorSnowCoveredLeft-bg': !platformToLeft && !!entity,
					'WoodFloorSnowCoveredRight-bg': !platformToRight && !!entity,
				})}
			/>
		);
	},

	getWarning({ entity, room }) {
		const platformToLeft = isFloorToLeft(entity, room);
		const platformToRight = isFloorToRight(entity, room);

		if (!platformToRight && !platformToLeft) {
			return 'Needs to be at least 2 tiles wide';
		}
	},
};

export { WoodFloorSnowCovered };
