import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_BELOW_16, ANY_OBJECT_SET } from './constants';

const graphicSets = [0xb, 0xc, 0xd, 0xe, 0xf];

const GrandGoomba: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-giant',
		title: 'Grand Goomba',
		description: 'Goomba, but grand',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [graphicSets, -1, -1, -1, -1, ANY_BELOW_16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x7c,

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
			[832, 833, 834, 835],
			[848, 849, 850, 851],
			[864, 865, 866, 867],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '125% 100%',
		};

		return (
			<div className="GrandGoomba-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 1.5,
			backgroundSize: '100%',
			marginTop: TILE_SIZE / 2,
			paddingTop: TILE_SIZE / 2,
			paddingRight: TILE_SIZE,
		};

		return (
			<div className="GrandGoomba-bg bg-center bg-no-repeat" style={style}>
				<div className="w-full h-full" style={{ marginTop: -TILE_SIZE }}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { GrandGoomba };
