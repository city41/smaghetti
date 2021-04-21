import type { Entity } from './types';
import { simpleSpriteBinary } from './util';

const OBJECT_ID = 0x83;

const Lakitu: Entity = {
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x11dc,
			0x169e,
			0x1b5f,
			0x25fd,
			0x369e,
			0x475f,
			0x111d,
			0x1a1f,
			0x329f,
			0x4b7f,
			0x7bda,
			0x6b55,
			0x56b1,
		],
		tiles: [
			[
				{ romOffset: 0x163768, tileIndex: 718 },
				{ romOffset: 0x163768, tileIndex: 718, flip: 'h' },
			],
			[
				{ romOffset: 0x163768, tileIndex: 734 },
				{ romOffset: 0x163768, tileIndex: 734, flip: 'h' },
			],
			[
				{ romOffset: 0x163768, tileIndex: 719 },
				{ romOffset: 0x163768, tileIndex: 719, flip: 'h' },
			],
			[
				{ romOffset: 0x163768, tileIndex: 735 },
				{ romOffset: 0x163768, tileIndex: 735, flip: 'h' },
			],
		],
	},

	toBinary(x, y) {
		return simpleSpriteBinary(x, y, OBJECT_ID);
	},
};

export { Lakitu };
