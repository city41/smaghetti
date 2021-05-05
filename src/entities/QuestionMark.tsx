import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';

/**
 * A question mark icon that once touched, completes the level.
 */

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const graphicSetsExceptNine = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15];

const QuestionMark: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Magic Question Mark Ball',
		description: 'Touching this completes the level',
	},

	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		graphicSets,
		graphicSetsExceptNine,
		graphicSets,
		0,
	],
	objectId: 0x4a,
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x101a,
			0x10bf,
			0x125f,
			0x25fd,
			0x369e,
			0x475f,
			0x139f,
			0x177,
			0x21c,
			0x29f,
			0x47bf,
			0x137f,
			0x25f,
		],
		romOffset: 0x16ea40,
		tiles: [
			[238, 239],
			[254, 255],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="QuestionMark-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { QuestionMark };
