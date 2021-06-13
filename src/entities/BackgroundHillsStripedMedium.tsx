import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const BackgroundHillsStripedMedium: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Background Hills - Striped, Medium',
	},

	objectSets: encodeObjectSets([[1, 1]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x0,
	emptyBank: 0,
	width: 5,
	height: 4,

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="BackgroundHillsStripedMedium-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: `100% ${(4 / 5) * 100}%`,
				}}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 5,
			height: TILE_SIZE * 4,
		};

		return (
			<div className="BackgroundHillsStripedMedium-bg bg-cover" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { BackgroundHillsStripedMedium };
