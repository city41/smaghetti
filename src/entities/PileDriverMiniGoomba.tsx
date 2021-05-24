import React from 'react';
import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const PileDriverMiniGoomba: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Pile Driver Mini Goomba',
	},

	objectSets: ANY_OBJECT_SET,
	// TODO: there are probably more sets, but since the dump always just
	// shows a brick, need to figure this one out manually
	spriteGraphicSets: [-1, -1, -1, 2, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6b,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0xda,
			0x159e,
			0x2a3f,
			0x3eff,
			0x1f4,
			0x29a,
			0x37f,
			0xb1,
			0x155,
			0x19d9,
			0x2e3d,
			0x3ebf,
			0x13,
		],
		tiles: [
			[{ romOffset: 0x1d1000, shift: 12, uncompressed: true, tileIndex: 125 }],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(size) {
		const style = { width: size, height: size };

		return (
			<div className="relative" style={style}>
				<div
					className="absolute PileDriverMiniGoomba-bg bg-cover bg-no-repeat bottom-0"
					style={{
						left: size / 4,
						width: size / 2,
						height: size / 2,
					}}
				/>
				<div
					className="absolute Brick-bg bg-cover bg-no-repeat w-full h-full left-0"
					style={{ top: '-8%' }}
				/>
				<div
					className="absolute PileDriverMiniGoomba-bg bg-cover bg-no-repeat bottom-0 opacity-25"
					style={{
						left: size / 4,
						width: size / 2,
						height: size / 2,
					}}
				/>
			</div>
		);
	},

	render() {
		const style = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div className="relative" style={style}>
				<div
					className="absolute PileDriverMiniGoomba-bg bottom-0"
					style={{
						left: TILE_SIZE / 4,
						width: TILE_SIZE / 2,
						height: TILE_SIZE / 2,
					}}
				/>
				<div
					className="absolute Brick-bg w-full h-full left-0"
					style={{ top: -2 }}
				/>
				<div
					className="absolute PileDriverMiniGoomba-bg bottom-0 opacity-25"
					style={{
						left: TILE_SIZE / 4,
						width: TILE_SIZE / 2,
						height: TILE_SIZE / 2,
					}}
				/>
			</div>
		);
	},
};

export { PileDriverMiniGoomba };
