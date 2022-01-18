import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
} from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const JelectroStill: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-water',
		title: 'Jelectro - Still',
		description: (
			<>
				<p>Like a normal Jelectro except it does not bob up and down.</p>
				<p>
					These can be better than regular Jelectros if you are building
					&quot;walls&quot; with them, they will use up fewer bytes in your
					level.
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
		[6, 15],
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
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'cell',
	dimensions: 'x',
	objectId: 0x34,

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, 0x34];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Width(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="relative Jelectro-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					still
				</div>
			</div>
		);
	},

	render() {
		const width = TILE_SIZE;
		const height = TILE_SIZE;

		const labelStyle = {
			fontSize: 2,
			bottom: 0,
		};

		return (
			<div className="relative Jelectro-bg bg-cover" style={{ width, height }}>
				<div
					className="absolute left-0 w-full text-center bg-black text-white"
					style={labelStyle}
				>
					still
				</div>
			</div>
		);
	},
};

export { JelectroStill };
