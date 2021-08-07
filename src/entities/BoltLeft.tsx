import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, getBankParam1 } from './util';

function isBoltToLeft(
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

	return cellToLeft.type === 'BoltLeft';
}

const BoltLeft: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Bolt - Left',
		description: 'Bolt Lifts ride on these',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	objectId: 0x6,
	emptyBank: 1,

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		const style = {
			width: size / 2,
			height: size / 2,
			backgroundSize: '50% 100%',
		};
		return (
			<div className="flex flex-row items-center">
				<div className="BoltNut-bg bg-cover" style={style} />
				<div className="BoltShaft-bg bg-cover" style={style} />
			</div>
		);
	},

	render({ entity, room }) {
		const boltToLeft = isBoltToLeft(entity, room);

		return (
			<div
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
				className={clsx({
					'BoltShaft-bg': boltToLeft,
					'BoltNut-bg': !boltToLeft,
				})}
			/>
		);
	},
};

export { BoltLeft };
