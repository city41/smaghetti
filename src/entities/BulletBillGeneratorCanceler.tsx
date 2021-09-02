import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { GeneratorFrame } from './components/GeneratorFrame';

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
				className="BulletBillGeneratorCanceler-bg"
				style={style}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { BulletBillGeneratorCanceler };
