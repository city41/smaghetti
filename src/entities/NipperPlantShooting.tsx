import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const NipperPlantShooting: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Nipper Plant - Shooting',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [3, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x3d,

	resource: {
		romOffset: 0x163768,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x11f1,
				0x1a75,
				0x22f9,
				0x318c,
				0x4631,
				0x56b5,
				0x2b5c,
				0xda,
				0x219e,
				0x363f,
				0x7eb7,
				0x6e11,
				0x596d,
			],
		],
		tiles: [
			[674, 675],
			[690, 691],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="relative NipperPlant-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					shooting
				</div>
			</div>
		);
	},

	render() {
		const width = TILE_SIZE;
		const height = TILE_SIZE;

		const labelStyle = {
			fontSize: 2,
			bottom: 0,
		};

		return (
			<div
				className="relative NipperPlant-bg bg-cover"
				style={{ width, height }}
			>
				<div
					className="absolute left-0 w-full text-center bg-black text-white"
					style={labelStyle}
				>
					shooting
				</div>
			</div>
		);
	},
};

export { NipperPlantShooting };
