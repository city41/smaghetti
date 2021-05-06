import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

/**
 * no single graphic set made this valid, probably needs two? or possibly
 * this is just a bogus entity
 */
const FlyingPiranhaPlant: Entity = {
	paletteInfo: {
		title: 'Flying Piranha Plant',
	},

	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0xd8,
	editorType: 'entity',
	dimensions: 'none',

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
		romOffset: 0x1724f0,
		tiles: [
			[992, { romOffset: 0x1724f0, tileIndex: 992, flip: 'h' }],
			[1008, { romOffset: 0x1724f0, tileIndex: 1008, flip: 'h' }],
			[
				{ romOffset: 0x18c914, tileIndex: 111 },
				{ romOffset: 0x18c914, tileIndex: 111, flip: 'h' },
			],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
			backgroundSize: '66% 100%',
		};

		return (
			<div
				className="FlyingPiranhaPlant-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 1.5,
			paddingBottom: TILE_SIZE / 2,
			marginLeft: TILE_SIZE / 2,
		};

		return (
			<div
				className="FlyingPiranhaPlant-bg bg-center bg-no-repeat"
				style={style}
			>
				<div className="w-full h-full" style={{ marginLeft: -TILE_SIZE / 2 }}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { FlyingPiranhaPlant };
