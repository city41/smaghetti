import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const LakituCloudAlternate: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Lakitu Cloud - Alternate',
		description: 'A Lakitu Cloud that is compatible with different things',
	},

	objectSets: encodeObjectSets([
		[12, 4],
		[4, 4],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'width',
	objectId: 0x35,
	alternateObjectIds: [0x2d],
	emptyBank: 1,

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="LakituCloud-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { LakituCloudAlternate };
