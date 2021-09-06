import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { getBankParam1, parseCellObjectsParam1Height } from './util';

function isRopeBelow(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellBelow = room.stage.matrix[entity.y + 1]?.[entity.x];

	if (!cellBelow) {
		return false;
	}

	return cellBelow.type === 'Rope';
}

const Rope: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Rope',
		description:
			'Climbable, but unlike vines you have complete control over their height',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'y',
	objectId: 0x59,
	emptyBank: 1,

	resources: {
		RopeBody: {
			romOffset: 0x20e4f0,
			palettes: [
				[
					0x7f40,
					0x7fff,
					0x0,
					0x7629,
					0x7f30,
					0x7fd2,
					0x7ffb,
					0x2e39,
					0x42bd,
					0x535f,
					0x3708,
					0x3f6d,
					0x4bd1,
					0x5bf4,
					0x36df,
					0x6bf8,
				],
			],
			tiles: [
				[44, 45],
				[44, 45],
			],
		},
		RopeTail: {
			romOffset: 0x20e4f0,
			palettes: [
				[
					0x7f40,
					0x7fff,
					0x0,
					0x7629,
					0x7f30,
					0x7fd2,
					0x7ffb,
					0x2e39,
					0x42bd,
					0x535f,
					0x3708,
					0x3f6d,
					0x4bd1,
					0x5bf4,
					0x36df,
					0x6bf8,
				],
			],
			tiles: [
				[44, 45],
				[60, 61],
			],
		},
	},

	toObjectBinary({ x, y, h }) {
		return [getBankParam1(1, h), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Height(data, offset, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};
		return <div className="RopeTail-bg bg-cover" style={style} />;
	},

	render({ entity, room }) {
		const ropeBelow = isRopeBelow(entity, room);

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};
		return (
			<div
				className={clsx('bg-cover', {
					'RopeBody-bg': ropeBelow,
					'RopeTail-bg': !ropeBelow,
				})}
				style={style}
			/>
		);
	},
};

export { Rope };
