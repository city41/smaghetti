import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Height,
} from './util';

function isBoltAbove(
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

	return cellAbove.type === 'BoltUp';
}

const BoltUp: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-airship',
		title: 'Bolt - Up',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'y',
	objectId: 0x9,
	emptyBank: 1,

	toObjectBinary({ x, y, h }) {
		return [getBankParam1(1, h), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Height(data, offset, this);
	},

	simpleRender(size) {
		const style = {
			width: size / 2,
			height: size / 2,
			backgroundSize: '50% 100%',
		};
		return (
			<div className="flex flex-col items-center">
				<div
					className="BoltNut-bg bg-cover transform rotate-90"
					style={style}
				/>
				<div
					className="BoltShaft-bg bg-cover transform rotate-90"
					style={style}
				/>
			</div>
		);
	},

	render({ entity, room }) {
		const boltAbove = isBoltAbove(entity, room);

		return (
			<div
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
				className={clsx('transform rotate-90', {
					'BoltShaft-bg': boltAbove,
					'BoltNut-bg': !boltAbove,
				})}
			/>
		);
	},
};

export { BoltUp };
