import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { GeneratorFrame } from './components/GeneratorFrame';

const ParaBobombGeneratorCanceler: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Para Bobomb Canceler',
		description:
			'Once Mario goes to the right and above it, any active Para Bobomb generators will stop. They will turn on again if he goes back left of the canceler.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, 0, -1, -1, 6],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6c,

	toSpriteBinary({ x, y }) {
		if (x % 2 === 0) {
			// if not at an odd x, don't emit it, otherwise it will
			// be a galoomba canceler. The user gets a warning so it's ok
			// to emit nothing here.
			// this does matter as sure the canceler will cancel the bobombs regardless,
			// but if Mario goes back to the left, galoombas will spawn, not bobombs
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
				className="ParaBobombGenerator-bg"
				style={style}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},

	getWarning({ entity }) {
		const tx = entity.x / TILE_SIZE;

		if (tx % 2 === 0) {
			return 'Must be placed on an odd x tile';
		}
	},
};

export { ParaBobombGeneratorCanceler };
