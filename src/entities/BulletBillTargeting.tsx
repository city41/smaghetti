import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const BulletBillTargeting: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Bullet Bill - Targeting',
		description:
			'A Bullet Bill that seeks out Mario and flies towards him. This is an enemy on the SMA4 ROM that Nintendo never ended up using.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, 4, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	objectId: 0x5,
	emptyBank: 0,
	dimensions: 'none',

	resource: {
		palettes: [
			[
				0x7fb4,
				0x7fff,
				0x0,
				0x75ad,
				0x7a94,
				0x7f39,
				0x25de,
				0x273f,
				0x1b1d,
				0x2fbf,
				0x53ff,
				0x119,
				0x167b,
				0x6ab2,
				0x7b98,
				0x7bdd,
			],
		],
		romOffset: 0x18fa98,
		tiles: [
			[80, 81],
			[112, 113],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			transform: 'rotate(15deg)',
			transformOrigin: 'center center',
		};

		return <div className="BulletBillTargeting-bg bg-cover" style={style} />;
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { BulletBillTargeting };
