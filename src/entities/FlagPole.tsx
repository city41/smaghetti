import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const FlagPole: Entity = {
	paletteInfo: {
		title: 'Flag Pole',
		warning: 'So far this is just the flag, need to figure out the pole',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0x13],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x1c,

	resource: {
		romOffset: 0x18c914,
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x26b,
			0x1b10,
			0x13b4,
			0x25fd,
			0x369e,
			0x475f,
			0x1abf,
			0x1c,
			0x253f,
			0x463f,
			0x7ad1,
			0x6e2c,
			0x59a6,
		],
		tiles: [
			[784, 785],
			[816, 817],
		],
	},

	toSpriteBinary(x, y) {
		return [1, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="FlagPole-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { FlagPole };
