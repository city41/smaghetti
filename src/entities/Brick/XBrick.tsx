import type { Entity } from '../types';
import { getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';

const XBrick: Entity = {
	paletteInfo: {
		title: 'Brick - Horizontal only',
		warning: 'Not intended for use in Smaghetti',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	objectId: 0x11,
	param1: 'width',
	emptyBank: 1,

	resource: {
		romOffset: 0x131fe0,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x209,
				0x228e,
				0x3732,
				0x47b7,
				0x1f4,
				0x29a,
				0x37f,
				0x15,
				0xd9d,
				0x2bf,
				0x3600,
				0x4aa5,
				0x5b29,
			],
		],
		tiles: [
			[308, 310],
			[309, 311],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="XBrick-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { XBrick };
