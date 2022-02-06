import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

/**
 * This is another object that ultimately is just normal coins in game.
 * Not needed for Smaghetti, as the already existing Coin entity works
 * just fine. This one is used in Castle Dash, room 1.
 *
 * It only has one dimension, either x or y, and the first param decides
 * first param is 0 - dimension is y
 * first param is not 0 - dimension is x
 */
const Coin2: Entity = {
	paletteCategory: 'binary',
	paletteInfo: {
		title: 'Coin2',
		description: 'An alternate coin object used in Castle Dash',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	objectId: 0x71,
	emptyBank: 1,
	param1: 'other',
	param2: 'width',

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, 1), y, x, this.objectId, w];
	},

	simpleRender(size) {
		return (
			<div className="Coin-bg bg-cover" style={{ width: size, height: size }} />
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { Coin2 };
