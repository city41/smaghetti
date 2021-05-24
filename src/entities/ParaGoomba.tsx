import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_16, ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const ParaGoomba: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Para Goomba',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_16],
	layer: 'actor',
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
		return [0, this.objectId!, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="relative ParaGoomba-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div
					className="ParaWing-bg bg-cover absolute"
					style={{
						width: size / 2,
						height: size,
						right: (-size * 1) / 5,
						top: (-size * 2) / 3,
					}}
				/>
				<div
					className="ParaWing-bg bg-cover absolute"
					style={{
						width: size / 2,
						height: size,
						left: (-size * 1) / 5,
						top: (-size * 2) / 3,
						transform: 'scale(-1, 1)',
					}}
				/>
			</div>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE);
	},
};

export { ParaGoomba };
