import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import clsx from 'clsx';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

function isWaterfallAbove(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellAbove = room.stage.matrix[entity.y - 1]?.[entity.x];

	if (!cellAbove) {
		return false;
	}

	return cellAbove.type === 'Waterfall';
}

const Waterfall: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Waterfall',
		description: 'Pushes Mario down when he swims in it',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x23,
	param1: 'height',
	param2: 'width',
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
		romOffset: 0x176be8,
		tiles: [
			[428, 429],
			[430, 431],
		],
	},

	toObjectBinary(x, y, w, h): number[] {
		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	simpleRender(size) {
		return (
			<div
				className="WaterfallTop-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(_showDetails, _settings, _osc, entity, room) {
		const waterAbove = isWaterfallAbove(entity, room);

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div
				style={style}
				className={clsx('bg-cover', {
					'WaterfallTop-bg': !waterAbove,
					'Waterfall-bg': waterAbove,
				})}
			/>
		);
	},
};

export { Waterfall };
