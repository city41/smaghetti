import type { Entity } from './types';
import { getBankParam1 } from './util';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

const GlassBlock: Entity = {
	objectSets: [ROOM_TYPE_SETTINGS.underground.objectSet],
	graphicSets: [ROOM_TYPE_SETTINGS.underground.objectGraphicSet],
	editorType: 'cell',
	gameType: 'object',
	dimensions: 'x',
	param2: 'width',
	objectId: 0x28,
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
			0xdf7,
			0x267c,
			0x435f,
			0x5bbf,
			0x0,
			0x0,
		],
		romOffset: 0x167674,
		tiles: [
			[864, 866],
			[865, 867],
		],
	},

	toBinary(x, y, w) {
		return [getBankParam1(1, 0), y, x, this.objectId!, w];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="GlassBlock-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { GlassBlock };
