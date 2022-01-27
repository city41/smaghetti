import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const BumptyAggressive: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-winter',
		title: 'Bumpty - Aggressive',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xf],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xf3,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="relative Bumpty-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					aggro
				</div>
			</div>
		);
	},

	render() {
		const style = { width: TILE_SIZE, height: TILE_SIZE };
		const footOffset = Math.round(((1 / 8) * TILE_SIZE) / 2);

		const leftFootStyle = {
			bottom: -footOffset,
			left: footOffset * 2,
			width: TILE_SIZE / 2,
			height: TILE_SIZE / 2,
		};

		const rightFootStyle = {
			bottom: -footOffset,
			right: footOffset * 2,
			width: TILE_SIZE / 2,
			height: TILE_SIZE / 2,
		};

		const labelStyle = {
			fontSize: 2,
			bottom: 0,
		};

		return (
			<div style={style} className="relative Bumpty-bg bg-cover">
				<div
					className="absolute BumptyFoot-bg bg-cover"
					style={leftFootStyle}
				/>
				<div
					className="absolute BumptyFoot-bg bg-cover"
					style={rightFootStyle}
				/>
				<div
					className="absolute left-0 w-full text-center bg-black text-white"
					style={labelStyle}
				>
					aggro
				</div>
			</div>
		);
	},
};

export { BumptyAggressive };
