import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

const LogBridge: Entity = {
	editorType: 'cell',
	gameType: 'object',
	dimensions: 'x',
	objectId: 0x21,
	emptyBank: 1,
	param1: 'width',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x520c,
			0x6270,
			0x72f3,
			0x7b77,
			0x1f4,
			0x29a,
			0x37f,
			0x7e93,
			0x7f17,
			0x7fbc,
			0x7ffe,
			0x1df,
			0x31f,
		],
		romOffset: 0x16ea40,
		tiles: [
			[982, 982],
			[983, 983],
		],
	},

	toBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="LogBridge-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	// TODO: offset the bridge visually
	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { LogBridge };
