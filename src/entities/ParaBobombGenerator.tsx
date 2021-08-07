import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { GeneratorFrame } from './components/GeneratorFrame';

const ParaBobombGenerator: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Para Bobomb Generator',
		description: 'Will turn on when Mario is to the right and above it',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, 0, -1, -1, 6],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6d,

	resource: {
		romOffset: 0x18c914,
		palettes: [
			[
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
		],
		tiles: [
			[64, 65],
			[96, 97],
			[69, { tileIndex: 69, flip: 'h' }],
			[101, { tileIndex: 101, flip: 'h' }],
		],
	},

	toSpriteBinary({ x, y }) {
		if (x % 2 === 0) {
			// if not at an odd x, don't emit it, otherwise it will
			// be a galoomba generator. The user gets a warning so it's ok
			// to emit nothing here
			return [];
		}

		return [1, this.objectId, x, y, 5];
	},

	simpleRender(size) {
		const style = {
			backgroundPositionX: '25%',
			backgroundPositionY: 'center',
			backgroundSize: '45% 90%',
		};

		return (
			<GeneratorFrame
				size={size}
				className="ParaBobombGenerator-bg"
				style={style}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},

	getWarning({ entity, room }) {
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

export { ParaBobombGenerator };
