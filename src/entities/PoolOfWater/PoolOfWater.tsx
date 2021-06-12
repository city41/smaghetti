import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const WATER_COLOR = 'rgb(24, 139, 205)';

function isWaterAbove(
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

	return cellAbove.type === 'PoolOfWater';
}

function isTallerThanOne(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellAbove = room.stage.matrix[entity.y - 1]?.[entity.x];
	const cellBelow = room.stage.matrix[entity.y + 1]?.[entity.x];

	return cellAbove?.type === 'PoolOfWater' || cellBelow?.type === 'PoolOfWater';
}

const PoolOfWater: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Pool of Water',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x3e,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x620d,
				0x7271,
				0x7b15,
				0x7fbb,
				0x6623,
				0x7b2e,
				0x7fd6,
				0x15f8,
				0x2a5b,
				0x3add,
				0x475f,
			],
		],
		romOffset: 0x176be8,
		tiles: [[420, 421]],
	},

	toObjectBinary(x, y, w, h): number[] {
		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	simpleRender(size) {
		return (
			<div style={{ width: size, height: size }} className="grid grid-rows-2">
				<div
					className="PoolOfWater-bg w-full h-full"
					style={{ backgroundSize: '50% 100%', backgroundRepeat: 'repeat-x' }}
				/>
				<div
					className="w-full h-full"
					style={{
						backgroundColor: WATER_COLOR,
					}}
				/>
			</div>
		);
	},

	render(_showDetails, _settings, _osc, entity, room) {
		const waterAbove = isWaterAbove(entity, room);
		const tallerThanOne = isTallerThanOne(entity, room);
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		// in game, if water is only one tile high then it lacks sparkles
		// so this allows the editor to match that
		if (waterAbove || !tallerThanOne) {
			return <div style={{ ...style, backgroundColor: WATER_COLOR }} />;
		} else {
			return (
				<div style={style} className="grid grid-rows-2">
					<div className="PoolOfWater-bg w-full h-full" />
					<div
						className="w-full h-full"
						style={{
							backgroundColor: WATER_COLOR,
						}}
					/>
				</div>
			);
		}
	},
};

export { PoolOfWater };
