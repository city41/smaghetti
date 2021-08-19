import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, getBankParam1 } from './util';

function isBoltBelow(
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

	return cellBelow.type === 'BoltDown';
}

const BoltDown: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-airship',
		title: 'Bolt - Down',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'y',
	objectId: 0x8,
	emptyBank: 1,

	toObjectBinary({ x, y, h }) {
		return [getBankParam1(1, h), y, x, this.objectId];
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
					className="BoltShaft-bg bg-cover transform rotate-90"
					style={style}
				/>
				<div
					className="BoltNut-bg bg-cover transform rotate-90"
					style={style}
				/>
			</div>
		);
	},

	render({ entity, room }) {
		const boltBelow = isBoltBelow(entity, room);

		return (
			<div
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
				className={clsx('transform rotate-90', {
					'BoltShaft-bg': boltBelow,
					'BoltNut-bg': !boltBelow,
				})}
			/>
		);
	},
};

export { BoltDown };
