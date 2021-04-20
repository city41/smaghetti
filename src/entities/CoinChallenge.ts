import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

/**
 * This is the weird thing at the beginning of mushroom05, Bombarded by Bob-ombs.
 * Once mario hits it from below, he is then tasked with collecting a certain amount of coins
 *
 * the amount to collect is param1 (byte 5).
 *
 * TODO: details panel allowing user to specify the coin number. so far hardcoded to 100
 */
const CoinChallenge: Entity = {
	type: 'CoinChallenge',
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	romOffset: 0x189ac0,
	objectId: 0xfd,
	param1: 'other',
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
	tiles: [
		[94, 95],
		[126, 127],
	],

	toBinary(x, y) {
		return [0, this.objectId!, x, y, 4];
	},
};

export { CoinChallenge };
