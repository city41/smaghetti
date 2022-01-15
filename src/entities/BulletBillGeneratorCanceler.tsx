import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { GeneratorFrame } from './components/GeneratorFrame';
import { parseSimpleSprite } from './util';

const BulletBillGeneratorCanceler: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Bullet Bill Canceler',
		description:
			'Once Mario goes to the right and above it, any active Bullet Bill generators will stop. They will turn on again if he goes back left of the canceler.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, 4, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x69,

	resource: {
		romOffset: 0x18fa98,
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
		tiles: [
			[
				{ tileIndex: 81, flip: 'h' },
				{ tileIndex: 80, flip: 'h' },
			],
			[
				{ tileIndex: 113, flip: 'h' },
				{ tileIndex: 112, flip: 'h' },
			],
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
			backgroundPositionX: '20%',
			backgroundPositionY: '25%',
			backgroundSize: '60%',
		};

		return (
			<GeneratorFrame
				canceler
				size={size}
				resourceClassName="BulletBillGeneratorCanceler-bg bg-no-repeat"
				resourceStyle={style}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { BulletBillGeneratorCanceler };
