import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';

const BoomerangBro: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Boomerang Bro',
	},

	spriteGraphicSets: [0, 0, 0, 0, 0, 1],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x82,

	resource: {
		palette: [
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
		romOffset: 0x1724f0,
		tiles: [
			[896, 897],
			[953, 954],
			[939, 940],
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
			<div className="BoomerangBro-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 1.5,
			backgroundSize: '100%',
			marginTop: TILE_SIZE / 2,
			paddingTop: TILE_SIZE / 2,
		};

		return (
			<div className="BoomerangBro-bg bg-center bg-no-repeat" style={style}>
				<div className="w-full h-full" style={{ marginTop: -TILE_SIZE }}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { BoomerangBro };