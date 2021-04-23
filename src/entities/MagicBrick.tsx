import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

const MagicBrick: Entity = {
	editorType: 'cell',
	settingsType: 'single',
	dimensions: 'xy',
	objectId: 0x2b,
	param1: 'width',
	param2: 'height',
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x39ce,
			0x4a52,
			0x6318,
			0x77bd,
			0x732c,
			0x7fd2,
			0x7ffb,
			0x5810,
			0x7597,
			0x7e1d,
			0x0,
			0x0,
			0x0,
		],
		romOffset: 0x131fe0,
		tiles: [
			[308, 310],
			[309, 311],
		],
	},

	toObjectBinary(x, y, w, h): number[] {
		return [getBankParam1(1, w), y, x, this.objectId!, h];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="MagicBrick-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { MagicBrick };