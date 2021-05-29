import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const YellowSwitchBrick: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Yellow Switch Brick',
		description: 'Become solid when a yellow switch is active',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	objectId: 0x56,
	param1: 'width',
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x27df,
			0x0,
			0x56bf,
			0x433f,
			0x0,
			0x0,
			0x0,
			0x0,
			0x0,
			0x0,
			0x0,
			0x0,
			0x0,
			0x0,
			0x0,
		],
		romOffset: 0x20e4f0,
		tiles: [
			[10, 11],
			[12, 13],
		],
	},

	toObjectBinary(x, y, w): number[] {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="YellowSwitchBrick-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { YellowSwitchBrick };
