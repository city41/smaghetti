import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

const BonyBeetle: Entity = {
	objectSets: [ROOM_TYPE_SETTINGS.fortress.objectSet],
	graphicSets: [ROOM_TYPE_SETTINGS.fortress.objectGraphicSet],
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	objectId: 0xd2,

	resource: {
		romOffset: 0x18c914,
		palette: [
			0x7fff,
			0x7fff,
			0x0,
			0x5ad6,
			0x739c,
			0x7fff,
			0x26ff,
			0x37f,
			0x5bff,
			0x37f,
			0x4d7f,
			0x0,
			0x0,
			0x0,
			0x0,
			0x0,
		],
		tiles: [
			[406, 407],
			[438, 439],
		],
	},

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="BonyBeetle-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { BonyBeetle };
