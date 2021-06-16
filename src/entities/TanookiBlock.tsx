import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const TanookiBlock: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Tanooki Block',
		description: 'Invisible, except while Mario is in tanooki statue form',
		warning: 'Compatibility will probably get better as we learn more',
	},

	objectSets: encodeObjectSets([[1, 1]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	param1: 'height',
	objectId: 0x68,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				0x23df,
				0x7fff,
				0x0,
				0x4e71,
				0x5ef5,
				0x6f79,
				0x7bdd,
				0x13,
				0x19,
				0x1f,
				0x112,
				0x5a1f,
				0x6ebf,
				0x7f9f,
				0x579f,
				0x6fff,
			],
		],
		romOffset: 0x127000,
		tiles: [
			[
				{ tileIndex: 462, uncompressed: true, shift: 16 },
				{ tileIndex: 463, uncompressed: true, shift: 16 },
			],
			[
				{ tileIndex: 464, uncompressed: true, shift: 16 },
				{ tileIndex: 465, uncompressed: true, shift: 16 },
			],
		],
	},

	toObjectBinary(x, y, w) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="TanookiBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { TanookiBlock };
