import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

const DiggableSand: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Diggable Sand',
		description: 'Mario can dig through it',
	},

	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x6a,
	emptyBank: 1,
	param1: 'width',
	param2: 'height',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x15d2,
			0x2257,
			0x2afc,
			0x37be,
			0x20ba,
			0x21be,
			0x32df,
			0x3192,
			0x1636,
			0x2a9c,
			0x42ff,
			0x0,
			0x0,
		],
		romOffset: 0x20e4f0,
		tiles: [
			[72, 73],
			[88, 89],
		],
	},

	toObjectBinary(x, y, w, h): number[] {
		return [getBankParam1(1, w), y, x, this.objectId!, h];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="DiggableSand-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { DiggableSand };
