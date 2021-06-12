import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const SmallBackgroundHills: Entity = {
	paletteInfo: {
		title: 'Small Background Hills',
		warning: "This works fine, but haven't finished extracting it yet.",
	},

	objectSets: encodeObjectSets([[1, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'x',
	param1: 'width',
	objectId: 0x2b,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x7f40,
				0x7fff,
				0x0,
				0x7629,
				0x7f30,
				0x7fd2,
				0x7ffb,
				0x2e39,
				0x42bd,
				0x535f,
				0x3708,
				0x3f6d,
				0x4bd1,
				0x5bf4,
				0x36df,
				0x6bf8,
			],
		],
		romOffset: 0x16ea40,
		tiles: [
			[117, 118],
			[120, 121],
		],
	},

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="SmallBackgroundHills-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { SmallBackgroundHills };
