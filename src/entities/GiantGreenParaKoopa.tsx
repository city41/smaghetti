import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';

const graphicSets = [0xb, 0xc, 0xd, 0xe, 0xf];

const GiantGreenParaKoopa: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-giant',
		title: 'Giant Green Para Koopa',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [graphicSets, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x7e,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x26b,
				0x1b10,
				0x13b4,
				0x25fd,
				0x369e,
				0x475f,
				0x1abf,
				0x1c,
				0x253f,
				0x463f,
				0x7ad1,
				0x6e2c,
				0x59a6,
			],
		],
		romOffset: 0x16ea40,
		tiles: [
			[839, 840, 840],
			[855, 856, { romOffset: 0x18a6e4, tileIndex: 37 }],
			[871, 872, { romOffset: 0x18a6e4, tileIndex: 53 }],
			[884, 885, 886],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '75% 100%',
		};

		return (
			<div
				className="GiantGreenParaKoopa-bg bg-center bg-no-repeat"
				style={style}
			/>
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
			<div
				className="GiantGreenParaKoopa-bg bg-center bg-no-repeat"
				style={style}
			>
				<TileSpace />
			</div>
		);
	},
};

export { GiantGreenParaKoopa };
