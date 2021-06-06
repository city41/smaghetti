import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

const QuestionBlockGiant: Entity = {
	// paletteCategory: 'object',
	paletteInfo: {
		title: 'Question Block - Giant',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [9, -1, -1, -1, -1, -1],
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x94,

	resource: {
		romOffset: 0x1724f0,
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
			[768, 769, 770, 771],
			[784, 785, 786, 787],
			[800, 801, 802, 803],
			[816, 817, 818, 819],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="QuestionBlockGiant-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 2, height: TILE_SIZE * 2 };
		const spaceStyle = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div style={style} className="relative QuestionBlockGiant-bg bg-cover">
				<TileSpace style={spaceStyle} className="absolute top-0 left-0" />
			</div>
		);
	},
};

export { QuestionBlockGiant };
