import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';

/**
 * this is an empty bubble, it can take payloads
 *
 * TODO: figure out how to give it payloads
 */
const OBJECT_ID = 0xdb;

const Bubble: Entity = {
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x101a,
			0x10bf,
			0x125f,
			0x25fd,
			0x369e,
			0x475f,
			0x139f,
			0x177,
			0x21c,
			0x29f,
			0x47bf,
			0x137f,
			0x25f,
		],
		romOffset: 0x18af80,
		tiles: [
			[134, 135, 136, 137],
			[166, 167, 168, 169],
			[198, 199, 200, 201],
			[230, 231, 232, 233],
		],
	},

	toSpriteBinary(x, y) {
		// TODO: pretty sure bubbles are six bytes
		return [0, OBJECT_ID, x, y, 2];
	},

	simpleRender(mw, mh) {
		return (
			<div className="Bubble-bg bg-cover" style={{ width: mw, height: mh }} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
			backgroundSize: '100%',
			paddingBottom: TILE_SIZE,
			paddingRight: TILE_SIZE,
		};

		return (
			<div className="Bubble-bg bg-center bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { Bubble };
