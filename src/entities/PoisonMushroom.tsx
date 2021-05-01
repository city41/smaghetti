import React from 'react';
import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';

const PoisonMushroom: Entity = {
	paletteCategory: 'power-up',
	paletteInfo: {
		title: 'Poison Mushroom',
	},

	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xf1,

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="PoisonMushroom-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { PoisonMushroom };
