import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';

const SledgeBro: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Sledge Bro',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x86,

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
			[904, 905, 911],
			[920, 921, 927],
			[932, 933, 909],
			[948, 949, 950],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId!, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '75% 100%',
		};

		return (
			<div className="SledgeBro-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 1.5,
			height: TILE_SIZE * 2,
			backgroundSize: '100%',
			paddingTop: TILE_SIZE,
			paddingRight: TILE_SIZE * 0.5,
		};

		return (
			<div className="SledgeBro-bg bg-center bg-no-repeat" style={style}>
				<div className="w-full h-full" style={{ marginTop: -TILE_SIZE }}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { SledgeBro };
