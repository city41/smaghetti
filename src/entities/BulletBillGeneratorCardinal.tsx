import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { GeneratorFrame } from './components/GeneratorFrame';

const BulletBillGeneratorCardinal: Entity = {
	// paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Bullet Bill Generator - Cardinal',
		description:
			'Shoots at Mario from below, left and right. Mario must be on the right of it for it to activate.',
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
			[82, 83],
			[114, 115],
		],
	},

	toSpriteBinary(x, y) {
		// at odd y's, it even diagonally. That is a BulletBillGeneratorDiagonal. The user
		// was warned to place this entity at an even y, so emitting nothing is OK.
		// if (y % 2 === 0) {
		// 	return [];
		// }

		return [1, this.objectId, x, y];
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
				className="BulletBillGeneratorCardinal-bg"
				style={style}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},

	getWarning(_settings, entity, room) {
		const player = room.actors.entities.find((e) => e.type === 'Player')!;

		const px = player.x / TILE_SIZE;
		const tx = entity.x / TILE_SIZE;
		const ty = entity.y / TILE_SIZE;
		const diff = tx - Math.max(px, 2);

		if (diff < 15) {
			const delta = 15 - diff;
			return `Must be ${delta} more tiles to the right of Mario's starting position to work`;
		}

		if (ty % 2 === 0) {
			return 'Must be placed on an odd y tile';
		}
	},
};

export { BulletBillGeneratorCardinal };
