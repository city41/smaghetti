import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const Wiggler: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Wiggler',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, [0x6, 0x14]],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x13,

	resource: {
		romOffset: 0x18c914,
		palettes: [
			[
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
		],
		tiles: [
			[0, 1],
			[32, 33],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="Wiggler-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = { width: TILE_SIZE, height: TILE_SIZE };
		const flowerStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE / 2,
			top: -TILE_SIZE / 2,
			left: 7,
		};

		const footStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE / 2,
			left: 1,
			bottom: 0,
			border: '1px solid black',
			backgroundColor: '#f6734a',
		};

		return (
			<div style={style} className="relative">
				<div
					style={flowerStyle}
					className="absolute WigglerFlower-bg bg-cover"
				/>
				<div style={footStyle} className="absolute bg-black" />
				<div className="absolute top-0 left-0 w-full h-full Wiggler-bg bg-cover" />
			</div>
		);
	},
};

export { Wiggler };
