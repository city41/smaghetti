import React from 'react';
import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';

const ParaGoomba: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Para Goomba',
	},

	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x73,

	resource: {
		romOffset: 0x134104,
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
		tiles: [
			[394, 395],
			[426, 427],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="relative ParaGoomba-bg bg-cover"
				style={{ width: mw, height: mh }}
			>
				<div
					className="ParaWing-bg bg-cover absolute"
					style={{
						width: mw / 2,
						height: mh,
						right: (-mw * 1) / 5,
						top: (-mh * 2) / 3,
					}}
				/>
				<div
					className="ParaWing-bg bg-cover absolute"
					style={{
						width: mw / 2,
						height: mh,
						left: (-mw * 1) / 5,
						top: (-mh * 2) / 3,
						transform: 'scale(-1, 1)',
					}}
				/>
			</div>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { ParaGoomba };
