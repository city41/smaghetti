import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';

const TexturedDoor: Entity = {
	editorType: 'entity',
	gameType: 'object',
	dimensions: 'none',

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
			[108, 109],
			[124, 125],
			[110, 111],
			[126, 127],
		],
	},

	toBinary(x, y) {
		return [0, y, x, 0x46];
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
			backgroundSize: '50% 100%',
		};

		return (
			<div className="TexturedDoor-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
		};

		return (
			<div className="TexturedDoor-bg bg-cover bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { TexturedDoor };
