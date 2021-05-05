import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

const POWBlock: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'POW Block',
		description: 'Kills all enemies on the screen',
	},

	spriteGraphicSets: [0, 0, 0, 0, 0, 0],
	editorType: 'cell',
	dimensions: 'none',
	objectId: 0x59,
	emptyBank: 0,

	resource: {
		palette: [
			0x3340,
			0x7fff,
			0x0,
			0x4637,
			0x2ebb,
			0x3f3f,
			0x539f,
			0x0,
			0x0,
			0x2bff,
			0x291e,
			0x297f,
			0x2aff,
			0x0,
			0x0,
			0x0,
		],
		romOffset: 0x20e4f0,
		tiles: [
			[100, 101],
			[116, 117],
		],
	},

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		return (
			<div className="POWBlock-bg bg-cover" style={{ width: mw, height: mh }} />
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { POWBlock };
