import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';
import { encodeObjectSets } from '../util';

const POWBlock: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'POW Block',
		description: 'Kills all enemies on the screen',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
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
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="POWBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { POWBlock };
