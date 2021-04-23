import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

const IndestructibleBrick: Entity = {
	editorType: 'cell',
	gameType: 'object',
	dimensions: 'y',
	param1: 'height',
	objectId: 0x80,
	emptyBank: 1,

	resource: {
		palette: [
			0x7ffb,
			0x7fff,
			0x0,
			0x575d,
			0x169a,
			0x1237,
			0xdd3,
			0x36b8,
			0x2633,
			0x15b0,
			0x12c,
			0x12c,
			0x3ebf,
			0x2e3d,
			0x19d9,
			0x155,
		],
		romOffset: 0x20e4f0,
		tiles: [
			[78, 79],
			[94, 95],
		],
	},

	toBinary(x, y, _w, h) {
		return [getBankParam1(1, h), y, x, this.objectId!, 0];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="IndestructibleBrick-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { IndestructibleBrick };
