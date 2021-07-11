import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const graphicSetValues = [
	0x4,
	0x5,
	0x6,
	0x7,
	0x8,
	0x9,
	0xa,
	0xb,
	0xc,
	0xd,
	0xe,
	0xf,
	0x10,
	0x11,
	0x12,
	0x13,
	0x14,
	0x15,
	0x16,
	0x17,
	0x18,
	0x19,
	0x1a,
	0x1b,
	0x1c,
	0x1d,
	0x1e,
	0x1f,
];

const BowserFireGenerator: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Bowser Fire Generator',
		description:
			'It must be placed beyond the first screen, it turns on after Mario walks past it',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, graphicSetValues, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x71,

	resource: {
		romOffset: 0x17a894,
		palettes: [
			[
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
		],
		tiles: [
			[0, 1, 2],
			[16, 17, 18],
		],
	},

	toSpriteBinary(x, y) {
		return [1, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 66%' };
		return (
			<div
				className="relative BowserFireGenerator-bg bg-center bg-no-repeat"
				style={style}
			>
				<div className="absolute bottom-0 left-0 w-full text-center bg-black text-white text-xs">
					generator
				</div>
			</div>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 1.5, height: TILE_SIZE };
		const labelStyle = {
			fontSize: 2,
			bottom: 0,
		};

		return (
			<div style={style} className="relative BowserFireGenerator-bg bg-cover">
				<div
					className="absolute left-0 w-full text-center bg-black text-white"
					style={labelStyle}
				>
					generator
				</div>
			</div>
		);
	},

	getWarning(_settings, entity) {
		const tx = entity.x / TILE_SIZE;

		if (tx < 17) {
			const delta = 17 - tx;
			return `Move ${delta} tile${delta === 1 ? '' : 's'} right for it to work`;
		}
	},
};

export { BowserFireGenerator };
