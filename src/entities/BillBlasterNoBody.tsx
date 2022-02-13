import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets } from './util';
import { ANY_BELOW_0x16 } from './constants';

const BillBlasterNoBody: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-bowsers-army',
		title: 'Bill Blaster - Airship',
		description:
			'A Bill Blaster that does not have a body. Nintendo uses these in airship levels. Normal Bill Blasters are found in the common section.',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	// TODO: not sure 4 is needed. originally had ANY_SPRITE_GRAPHIC_SET
	// and it worked
	spriteGraphicSets: [-1, -1, -1, -1, 4, ANY_BELOW_0x16],
	layer: 'stage',
	editorType: 'entity',
	objectId: 0x1,
	emptyBank: 0,
	dimensions: 'none',

	toSpriteBinary({ x, y }) {
		// 0x90 is bullet bill
		// TODO: support flames
		return [1, 0x90, x, y];
	},

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};
		return <div className="BillBlasterBarrel-bg bg-cover" style={style} />;
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { BillBlasterNoBody };
