import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const WATER_COLOR = 'rgb(24, 104, 200)';

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

	return cellAbove.type === 'ChoppyWater';
}

const ChoppyWater: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Choppy Water',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x25,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,

	resource: {
		palettes: [
			[
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
		],
		romOffset: 0x176be8,
		tiles: [[199]],
	},

	toObjectBinary({ x, y, w, h }): number[] {
		return [getBankParam1(1, h), y, x, this.objectId, w];
	},

	simpleRender(size) {
		return (
			<div style={{ width: size, height: size }} className="grid grid-rows-2">
				<div
					className="ChoppyWater-bg w-full h-full"
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

	render({ entity, room }) {
		const waterAbove = isWaterAbove(entity, room);
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		if (waterAbove) {
			return <div style={{ ...style, backgroundColor: WATER_COLOR }} />;
		} else {
			return (
				<div style={style} className="grid grid-rows-2">
					<div className="ChoppyWater-bg w-full h-full" />
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

export { ChoppyWater };
