import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';

const Ludwig: Entity = {
	paletteCategory: 'boss',
	paletteInfo: {
		title: 'Ludwig',
	},

	spriteGraphicSets: [-1, -1, 2, -1, -1, 5],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x72,

	resource: {
		romOffset: 0x1724f0,
		palette: [
			0x7f96,
			0x0,
			0x7fff,
			0x2220,
			0x36c4,
			0x476a,
			0x4a52,
			0x5ef7,
			0x739c,
			0x57d2,
			0x11f9,
			0x227d,
			0x371f,
			0x7bd9,
			0x7755,
			0x66d1,
		],
		tiles: [
			[192, 193, 194],
			[208, 209, 210],
			[195, 196, 197],
			[211, 212, 213],
		],
	},

	toSpriteBinary(x, y) {
		return [1, 0x14, x, y, 0x73, 0xa];
	},

	simpleRender(width, height) {
		const style = { width, height, backgroundSize: '75% 100%' };

		return (
			<div
				className="relative Ludwig-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 1.5,
			height: TILE_SIZE * 2,
		};

		const wandStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: 8,
			left: -11,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: 0,
			left: 0,
		};

		return (
			<div className="relative Ludwig-bg bg-cover" style={style}>
				<div className="absolute KoopalingWand-bg" style={wandStyle} />
				<div className="absolute" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { Ludwig };