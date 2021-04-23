import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

const OBJECT_ID = 0xb;

const OneUpMushroom: Entity = {
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x26b,
			0x1b10,
			0x13b4,
			0x25fd,
			0x369e,
			0x475f,
			0x1abf,
			0x1c,
			0x253f,
			0x463f,
			0x7ad1,
			0x6e2c,
			0x59a6,
		],
		romOffset: 0x134104,
		tiles: [
			[266, 267],
			[298, 299],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, OBJECT_ID);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="OneUpMushroom-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { OneUpMushroom };
