import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { GeneratorFrame } from './components/GeneratorFrame';
import { parseSimpleSprite } from './util';

const ParaGaloombaGenerator: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Galoomba - Parachute, Generator',
		description: 'Will turn on when Mario is to the right and above it',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, 0, -1, -1, 6],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6d,

	toSpriteBinary({ x, y }) {
		if (x % 2 === 1) {
			// if not at an even x, don't emit it, otherwise it will
			// be a bobomb generator. The user gets a warning so it's ok
			// to emit nothing here
			return [];
		}

		return [1, this.objectId, x, y, 5];
	},

	parseSprite(data, offset) {
		const result = parseSimpleSprite(data, offset, 1, this);

		if (result && result.entity.x % 2 === 0 && data[result.offset] === 5) {
			return {
				...result,
				offset: result.offset + 1,
			};
		}
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
				resourceClassName="GaloombaWithParachute-bg bg-no-repeat"
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

export { ParaGaloombaGenerator };
