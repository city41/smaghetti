import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import React from 'react';
import { ANY_BELOW_16 } from './constants';

const Thwomp: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Thwomp',
	},

	spriteGraphicSets: [6, 0, 0, 0, 0, ANY_BELOW_16],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x8a,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x39ce,
			0x4a52,
			0x5ef7,
			0x7a8b,
			0x7f6e,
			0x7fd6,
			0x6f7b,
			0x19f8,
			0x2e5c,
			0x42ff,
			0x1b1f,
			0x1a1f,
			0x1d,
		],
		romOffset: 0x167674,
		tiles: [
			[170, 171, { romOffset: 0x167674, tileIndex: 170, flip: 'h' }],
			[186, 187, { romOffset: 0x167674, tileIndex: 186, flip: 'h' }],
			[174, 175, { romOffset: 0x167674, tileIndex: 174, flip: 'h' }],
			[190, 191, { romOffset: 0x167674, tileIndex: 190, flip: 'h' }],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
			backgroundSize: '75% 100%',
		};

		return <div className="Thwomp-bg bg-center bg-no-repeat" style={style} />;
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
			paddingBottom: TILE_SIZE,
			paddingRight: TILE_SIZE,
		};

		return (
			<div className="Thwomp-bg bg-center bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { Thwomp };
