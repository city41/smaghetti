import React from 'react';
import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_16, ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const ParaBomberGoomba: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Para Bomber Goomba',
		description: 'Flies high and drops mini goombas',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_16],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x74,

	resource: {
		romOffset: 0x134104,
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
				className="relative ParaBomberGoomba-bg bg-cover"
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
				<div
					className="PileDriverMiniGoomba-bg bg-cover absolute bg-black"
					style={{
						width: mw / 4,
						height: mh / 4,
						right: -1,
						bottom: -1,
					}}
				/>
			</div>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { ParaBomberGoomba };
