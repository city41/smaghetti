import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';

const HotHead: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Hot Head',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xd],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x4e,

	resource: {
		romOffset: 0x18c914,
		palette: [
			0x7fff,
			0x7fff,
			0x0,
			0x5ad6,
			0x739c,
			0x7fff,
			0x26ff,
			0x37f,
			0x5bff,
			0x37f,
			0x4d7f,
			0x0,
			0x0,
			0x0,
			0x0,
			0x0,
		],
		tiles: [
			[470, 471, 472, 473],
			[502, 503, 504, 505],
			[
				{ tileIndex: 505, flip: 'hv' },
				{ tileIndex: 504, flip: 'hv' },
				{ tileIndex: 503, flip: 'hv' },
				{ tileIndex: 502, flip: 'hv' },
			],
			[
				{ tileIndex: 473, flip: 'hv' },
				{ tileIndex: 472, flip: 'hv' },
				{ tileIndex: 471, flip: 'hv' },
				{ tileIndex: 470, flip: 'hv' },
			],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const eyesStyle = {
			width: size / 4,
			height: size / 4,
			left: size / 2,
			top: size / 4,
		};

		return (
			<div
				className="relative HotHead-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute HotHeadEyes-bg bg-cover" style={eyesStyle} />
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
			marginTop: -TILE_SIZE / 2,
			marginLeft: -TILE_SIZE / 2,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: TILE_SIZE / 2,
			left: TILE_SIZE / 2,
		};

		const eyesStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE / 2,
			left: TILE_SIZE / 2,
			top: TILE_SIZE / 16,
		};

		return (
			<div className="relative HotHead-bg bg-cover" style={style}>
				<div className="absolute" style={spaceStyle}>
					<TileSpace />
					<div className="absolute HotHeadEyes-bg" style={eyesStyle} />
				</div>
			</div>
		);
	},
};

export { HotHead };
