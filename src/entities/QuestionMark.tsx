import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_OBJECT_SET } from './constants';

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

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		graphicSets,
		graphicSetsExceptNine,
		graphicSets,
		0,
	],
	objectId: 0x4a,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palettes: [
			[
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
		],
		romOffset: 0x16ea40,
		tiles: [
			[238, 239],
			[254, 255],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="QuestionMark-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { QuestionMark };
