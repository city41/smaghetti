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

		return <div className="BulletBill-bg bg-cover" style={style} />;
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { BulletBillTargeting };
