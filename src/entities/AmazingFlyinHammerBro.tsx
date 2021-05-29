import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

const AmazingFlyinHammerBro: Entity = {
	paletteInfo: {
		title: "Amazing Flyin' Hammer Bro",
		description: 'Normally plopped on top of a Winged Platform',
		warning: "So far can't get it to ride the Winged Platform :(",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, 4, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xd9,

	resource: {
		romOffset: 0x18fa98,
		palette: [
			0x7fb4,
			0x7fff,
			0x0,
			0x75ad,
			0x7a94,
			0x7f39,
			0x25de,
			0x273f,
			0x1b1d,
			0x2fbf,
			0x53ff,
			0x119,
			0x167b,
			0x6ab2,
			0x7b98,
			0x7bdd,
		],
		tiles: [
			[
				{ romOffset: 0x18c914, tileIndex: 484 },
				52,
				{ tileIndex: 52, flip: 'h' },
				{ romOffset: 0x18c914, tileIndex: 484 },
			],
			[16, 17, 18, 19],
			[48, 49, 50, 51],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="AmazingFlyinHammerBro-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 1.5,
			marginTop: -TILE_SIZE * 0.5,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: TILE_SIZE * 0.5,
		};

		return (
			<div className="relative AmazingFlyinHammerBro-bg" style={style}>
				<div style={spaceStyle} className="absolute left-0">
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { AmazingFlyinHammerBro };
