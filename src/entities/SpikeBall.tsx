import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';

const SpikeBall: Entity = {
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x4d,
	emptyBank: 0,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x1b7,
			0x265d,
			0x277e,
			0x35fe,
			0x3a9e,
			0x4b3f,
			0x2171,
			0x4988,
			0x5e2a,
			0x72ac,
			0x28df,
			0x141b,
			0x16,
		],
		romOffset: 0x18af80,
		tiles: [
			[452, 453, 454, 455],
			[484, 485, 486, 487],
			[
				{ romOffset: 0x18af80, tileIndex: 487, flip: 'hv' },
				{ romOffset: 0x20e4f0, tileIndex: 15 },
				{ romOffset: 0x20e4f0, tileIndex: 15, flip: 'h' },
				{ romOffset: 0x18af80, tileIndex: 487, flip: 'v' },
			],
			[
				{ romOffset: 0x18af80, tileIndex: 452, flip: 'v' },
				{ romOffset: 0x18af80, tileIndex: 453, flip: 'v' },
				{ romOffset: 0x18af80, tileIndex: 454, flip: 'v' },
				{ romOffset: 0x18af80, tileIndex: 455, flip: 'v' },
			],
		],
	},

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="SpikeBall-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
		};

		return (
			<div className="SpikeBall-bg bg-cover" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { SpikeBall };