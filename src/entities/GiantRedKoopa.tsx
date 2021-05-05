import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_BELOW_16 } from './constants';

const graphicSets = [0xb, 0xc, 0xd, 0xe, 0xf];

const GiantRedKoopa: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Giant Red Koopa',
	},

	spriteGraphicSets: [graphicSets, -1, -1, -1, -1, ANY_BELOW_16],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x7b,

	resource: {
		palette: [
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
		romOffset: 0x16ea40,
		tiles: [
			[839, 840, 840],
			[855, 856, 857],
			[871, 872, 873],
			[884, 885, 886],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
			backgroundSize: '75% 100%',
		};

		return (
			<div className="GiantRedKoopa-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 1.5,
			height: TILE_SIZE * 2,
			backgroundSize: '100%',
			paddingBottom: TILE_SIZE,
			paddingRight: TILE_SIZE / 2,
		};

		return (
			<div className="GiantRedKoopa-bg bg-center bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { GiantRedKoopa };
