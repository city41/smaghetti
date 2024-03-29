import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET, OBJECT_PRIORITY_LOWEST } from './constants';
import { encodeObjectSets, parseSimpleObject } from './util';

const Water: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-water',
		title: 'Water',
		description: (
			<>
				<p>
					Adds water to a level going right and down from its location. Want a
					full on water level? This is what you want.
				</p>
				<p>
					Checkout{' '}
					<a
						className="text-blue-500 hover:underline"
						href="/tips#how-to-make-a-standard-water-level"
						target="_blank"
						rel="noreferer nofollower"
					>
						the tips page
					</a>{' '}
					for more info.
				</p>
			</>
		),
	},

	objectSets: encodeObjectSets([
		[6, 10],
		[6, 11],
		[6, 12],
		[6, 13],
		[6, 14],
		[6, 1],
		[6, 2],
		[6, 3],
		[6, 4],
		[6, 5],
		[6, 6],
		[6, 8],
		[6, 9],
		[8, 10],
		[8, 11],
		[8, 12],
		[8, 13],
		[8, 14],
		[8, 1],
		[8, 2],
		[8, 3],
		[8, 4],
		[8, 5],
		[8, 6],
		[8, 8],
		[8, 9],
	]),
	objectPriority: OBJECT_PRIORITY_LOWEST,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xd,
	emptyBank: 0,

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size, fontSize: size * 0.25 };
		return (
			<div
				className="bg-blue-500 text-white font-bold grid place-items-center"
				style={style}
			>
				water
			</div>
		);
	},

	render({ entity, room }) {
		if (!entity || !room) {
			return this.simpleRender(TILE_SIZE);
		}

		const width = room.roomTileWidth - entity.x / TILE_SIZE;
		const height = Math.min(27, room.roomTileHeight - entity.y / TILE_SIZE);

		const style = { width: width * TILE_SIZE, height: height * TILE_SIZE };

		return (
			<div style={style} className="relative">
				<div className="w-full h-full bg-blue-500 opacity-30" />
				<div
					className="absolute top-0 left-0"
					style={{ width: TILE_SIZE, height: TILE_SIZE }}
				>
					{this.simpleRender(TILE_SIZE)}
				</div>
			</div>
		);
	},
};

export { Water };
