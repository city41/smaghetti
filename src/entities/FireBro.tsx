import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';

const FireBro: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-bro',
		title: 'Fire Bro',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x87,

	resource: {
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
		romOffset: 0x1724f0,
		tiles: [
			[896, 897],
			[953, 954],
			[939, 940],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '66% 100%',
		};

		return <div className="FireBro-bg bg-center bg-no-repeat" style={style} />;
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
			<div className="FireBro-bg bg-center bg-no-repeat" style={style}>
				<div className="w-full h-full" style={{ marginTop: -TILE_SIZE }}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { FireBro };
