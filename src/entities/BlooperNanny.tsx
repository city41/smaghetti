import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_16, ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

const BlooperNanny: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-water',
		title: 'Blooper Nanny',
		description: 'behaves best in water',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [7, -1, 1, -1, -1, ANY_BELOW_16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x61,

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const babyStyle = {
			width: size / 2,
			height: size,
			bottom: -size / 2,
			right: -size / 4,
		};

		return (
			<div
				className="relative Blooper-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div style={babyStyle} className="absolute BlooperBaby-bg bg-cover" />
			</div>
		);
	},

	render() {
		const style = { width: TILE_SIZE, height: TILE_SIZE };
		const babyStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE,
			left: TILE_SIZE / 4,
		};

		const babies = [];
		for (let i = 0; i < 4; ++i) {
			babies.push(
				<div
					key={i}
					style={{
						...babyStyle,
						top: -TILE_SIZE / 2 + -i * 4 + 2,
						zIndex: 4 - i,
					}}
					className="BlooperBaby-bg bg-cover absolute"
				/>
			);
		}

		return (
			<div style={style} className="relative">
				<div className="absolute z-10 top-0 left-0 Blooper-bg bg-cover w-full h-full" />
				{babies}
				<TileSpace />
			</div>
		);
	},
};

export { BlooperNanny };
