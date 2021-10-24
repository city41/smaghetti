import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { GeneratorFrame } from './components/GeneratorFrame';
import { parseSimpleSprite } from './util';

const BulletBillGeneratorDiagonal: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Bullet Bill Generator - Diagonal',
		description:
			'Shoots at Mario from diagonals. Mario must be above and to the right for it to activate.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, 4, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6a,

	resource: {
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
		romOffset: 0x18fa98,
		tiles: [
			[84, 85],
			[116, 117],
		],
	},

	toSpriteBinary({ x, y }) {
		// at even x's, it shoots cardinally. That is a BulletBillGeneratorCardinal. The user
		// was warned to place this entity at an even x, so emitting nothing is OK.
		if (x % 2 === 0) {
			return [];
		}

		return [1, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 1, this);
	},

	simpleRender(size) {
		const style = {
			backgroundPositionX: '20%',
			backgroundPositionY: '25%',
			backgroundSize: '60%',
		};

		return (
			<GeneratorFrame
				size={size}
				resourceClassName="BulletBillGeneratorDiagonal-bg bg-no-repeat"
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

		if (tx % 2 === 0) {
			return 'Must be placed on an odd x tile';
		}
	},
};

export { BulletBillGeneratorDiagonal };
