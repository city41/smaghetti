import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

const Coin: Entity = {
	editorType: 'cell',
	gameType: 'object',
	dimensions: 'xy',
	objectId: 0x16,
	emptyBank: 1,
	param1: 'width',
	param2: 'height',

	resource: {
		palette: [
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
		romOffset: 0x176be8,
		tiles: [
			[220, 222],
			[221, 223],
		],
	},

	toBinary(x, y, w, h) {
		return [getBankParam1(1, w), y, x, this.objectId!, h];
	},

	simpleRender(mw, mh) {
		return (
			<div className="Coin-bg bg-cover" style={{ width: mw, height: mh }} />
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { Coin };
