import React from 'react';
import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';

const Galoomba: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Galoomba',
		description: 'The Goombas of SMW',
	},

	spriteGraphicSets: [-1, -1, -1, -1, -1, 6],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x17,

	resource: {
		romOffset: 0x134104,
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x11dc,
			0x169e,
			0x1b5f,
			0x25fd,
			0x369e,
			0x475f,
			0x111d,
			0x1a1f,
			0x329f,
			0x4b7f,
			0x7bda,
			0x6b55,
			0x56b1,
		],
		tiles: [
			[30, 31],
			[62, 63],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div className="Galoomba-bg bg-cover" style={{ width: mw, height: mh }} />
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { Galoomba };
