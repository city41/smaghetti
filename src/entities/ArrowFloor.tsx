import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

/**
 * Does not work in current fortress/underground rooms
 */
const ArrowFloor: Entity = {
	editorType: 'cell',
	dimensions: 'x',
	param1: 'width',
	objectId: 0x57,
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x65a3,
			0x7a8b,
			0x7f6e,
			0x7fd6,
			0x1594,
			0x2e39,
			0x42bd,
			0x11,
			0x16,
			0x1a,
			0xdbe,
			0x123f,
			0x2bf,
		],
		romOffset: 0x163768,
		tiles: [
			[
				{
					romOffset: 0x127000,
					tileIndex: 416,
					uncompressed: true,
					shift: 16,
					flip: 'v',
				},
				{
					romOffset: 0x127000,
					tileIndex: 417,
					uncompressed: true,
					shift: 16,
					flip: 'v',
				},
			],
			[
				{
					romOffset: 0x127000,
					tileIndex: 416,
					uncompressed: true,
					shift: 16,
				},
				{
					romOffset: 0x127000,
					tileIndex: 417,
					uncompressed: true,
					shift: 16,
				},
			],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="ArrowFloor-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { ArrowFloor };
