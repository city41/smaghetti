import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { GeneratorFrame } from './components/GeneratorFrame';

const ParaGaloombaGeneratorCanceler: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Para Galoomba Canceler',
		description:
			'Once Mario goes to the right and above it, any active Para Galoomba generators will stop. They will turn on again if he goes back left of the canceler.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, 0, -1, -1, 6],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6c,

	toSpriteBinary({ x, y }) {
		if (x % 2 === 1) {
			// if not at an even x, don't emit it, otherwise it will
			// be a bobomb canceler. The user gets a warning so it's ok
			// to emit nothing here.
			// this does matter as sure the canceler will cancel the galoombas regardless,
			// but if Mario goes back to the left, bobombs will spawn, not galoombas
			return [];
		}

		return [1, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = {
			backgroundPositionX: '25%',
			backgroundPositionY: 'center',
			backgroundSize: '45% 90%',
		};

		return (
			<GeneratorFrame
				canceler
				size={size}
				className="GaloombaWithParachute-bg"
				style={style}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},

	getWarning({ entity }) {
		const tx = entity.x / TILE_SIZE;

		if (tx % 2 === 1) {
			return 'Must be placed on an even x tile';
		}
	},
};

export { ParaGaloombaGeneratorCanceler };
