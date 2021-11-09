import type { Entity } from '../types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1WidthParam2Height,
} from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { IconWater } from '../../icons';

const CoinWater: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Coin - Water',
		description:
			'A coin for water levels, Mario keeps swimming when touching these coins',
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
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x16,
	emptyBank: 1,
	param1: 'width',
	param2: 'height',

	toObjectBinary({ x, y, w, h }) {
		return [getBankParam1(1, w), y, x, this.objectId, h];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1WidthParam2Height(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="relative Coin-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<IconWater className="absolute -bottom-1 -right-1 w-4 h-4 text-blue-300" />
			</div>
		);
	},

	render() {
		return (
			<div
				className="relative Coin-bg bg-cover"
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
			>
				<IconWater
					style={{ borderRadius: '10%' }}
					className="absolute bottom-0 right-0 w-1 h-1 text-blue-200 bg-gray-800"
				/>
			</div>
		);
	},

	getProblem({ room }) {
		const hasChoppyWater = room.stage.entities.some(
			(e) => e.type === 'ChoppyWater'
		);

		const hasUnderwaterWater = room.stage.matrix.some((row) => {
			return row?.some((cell) => cell?.type === 'UnderwaterWater');
		});

		if (hasChoppyWater || hasUnderwaterWater) {
			return;
		}

		return 'Must add Choppy Water or Underwater Water to this room, or the game will crash';
	},
};

export { CoinWater };
