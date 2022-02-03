import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
} from './util';

function isBoltToRight(
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

	return cellToRight.type === 'BoltRight';
}

const BoltRight: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-bowsers-army',
		title: 'Bolt - Right',
		description: 'Bolt Lifts ride on these',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	objectId: 0x7,
	emptyBank: 1,

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Width(data, offset, this);
	},

	simpleRender(size) {
		const style = {
			width: size / 2,
			height: size / 2,
			backgroundSize: '50% 100%',
		};
		return (
			<div className="flex flex-row items-center">
				<div className="BoltShaft-bg bg-cover" style={style} />
				<div className="BoltNut-bg bg-cover" style={style} />
			</div>
		);
	},

	render({ entity, room }) {
		const boltToRight = isBoltToRight(entity, room);

		return (
			<div
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
				className={clsx({
					'BoltShaft-bg': boltToRight,
					'BoltNut-bg': !boltToRight,
				})}
			/>
		);
	},
};

export { BoltRight };
