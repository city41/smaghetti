import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

/**
 * This is the weird thing at the beginning of mushroom05, Bombarded by Bob-ombs.
 * Once mario hits it from below, he is then tasked with collecting a certain amount of coins
 *
 * the amount to collect is param1 (byte 5).
 *
 * TODO: details panel allowing user to specify the coin number. so far hardcoded to 100
 */
const CoinChallenge: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Coin Challenge',
		description:
			'If the player hits it, they are challenged to collect a certain number of coins. If they succeed, they get 3 lives',
	},

	spriteGraphicSets: [0, 0, 0, 0, 0, 0],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xfd,
	param1: 'other',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x3192,
			0x1636,
			0x2a9c,
			0x1f4,
			0x29a,
			0x37f,
			0x42ff,
			0x4a52,
			0x6318,
			0x77bd,
			0x7ffb,
			0x7fd2,
			0x732c,
		],
		romOffset: 0x189ac0,
		tiles: [
			[94, 95],
			[126, 127],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId!, x, y, 4];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="CoinChallenge-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { CoinChallenge };
