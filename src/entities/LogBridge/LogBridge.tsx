import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { TileSpace } from '../TileSpace';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const LogBridge: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Log Bridge',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	objectId: 0x21,
	emptyBank: 1,
	param1: 'width',

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x65a3,
				0x7a8b,
				0x7f6e,
				0x7fd6,
				0x1594,
				0x2e39,
				0x42bd,
				0x2260,
				0x2ac8,
				0x3b4c,
				0x47b0,
				0x223f,
				0x57f3,
			],
			[
				0x7f96,
				0x7fff,
				0x0,
				0x209,
				0x228e,
				0x3732,
				0x47b7,
				0x1f4,
				0x29a,
				0x37f,
				0x15,
				0xd9d,
				0x2bf,
				0x3600,
				0x4aa5,
				0x5b29,
			],
		],
		romOffset: 0x16ea40,
		tiles: [
			[982, 982],
			[
				{ tileIndex: 983, palette: 1 },
				{ tileIndex: 983, palette: 1 },
			],
		],
	},

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, w), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="LogBridge-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = {
			marginTop: TILE_SIZE / 2,
			width: TILE_SIZE,
			height: TILE_SIZE * 1.5,
			backgroundPositionY: TILE_SIZE / 2,
			paddingBottom: TILE_SIZE / 2,
		};

		return (
			<div className="LogBridge-bg bg-no-repeat" style={style}>
				<TileSpace
					className="w-full h-full"
					style={{ marginTop: -TILE_SIZE / 2 }}
				/>
			</div>
		);
	},
};

export { LogBridge };
