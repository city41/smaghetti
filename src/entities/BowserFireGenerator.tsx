import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { GeneratorFrame } from './components/GeneratorFrame';
import { parseSimpleSprite } from './util';

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

	toSpriteBinary({ x, y }) {
		return [1, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 1, this);
	},

	simpleRender(size) {
		const style = {
			backgroundPositionX: 'center',
			backgroundPositionY: '25%',
			backgroundSize: '90% 45%',
		};

		return (
			<GeneratorFrame
				size={size}
				resourceClassName="BowserFireGenerator-bg bg-no-repeat"
				resourceStyle={style}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},

	getProblem({ entity, room }) {
		const player = room.actors.entities.find((e) => e.type === 'Player')!;

		const px = player.x / TILE_SIZE;
		const tx = entity.x / TILE_SIZE;
		const diff = tx - Math.max(px, 2);

		if (diff < 15) {
			const delta = 15 - diff;
			return `Must be ${delta} more tiles to the right of Mario's starting position to work`;
		}
	},
};

export { BowserFireGenerator, graphicSetValues };
