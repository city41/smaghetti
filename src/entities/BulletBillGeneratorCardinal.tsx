import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { GeneratorFrame } from './components/GeneratorFrame';
import { parseSimpleSprite } from './util';

const BulletBillGeneratorCardinal: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Bullet Bill Generator - Cardinal',
		description:
			'Shoots at Mario from below, left and right. Mario must be above and to the right for it to activate.',
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
				0x27ff,
				0x7fff,
				0x0,
				0x75ad,
				0x7a94,
				0x7f39,
				0x25de,
				0x273f,
				0x029a,
				0x037f,
				0x4e73,
				0x6739,
				0x77bd,
				0x0,
				0x0,
				0x0,
			],
		],
		romOffset: 0x18fa98,
		tiles: [
			[82, 83],
			[114, 115],
		],
	},

	toSpriteBinary({ x, y }) {
		// at odd x's, it shoots diagonally. That is a BulletBillGeneratorDiagonal. The user
		// was warned to place this entity at an even x, so emitting nothing is OK.
		if (x % 2 === 1) {
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
				resourceClassName="BulletBillGeneratorCardinal-bg bg-no-repeat"
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

		if (tx % 2 === 1) {
			return 'Must be placed on an even x tile';
		}
	},
};

export { BulletBillGeneratorCardinal };
