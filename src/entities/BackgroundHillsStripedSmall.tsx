import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const BackgroundHillsStripedSmall: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Background Hills - Striped, Small',
	},

	objectSets: encodeObjectSets([[1, 1]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x1,
	emptyBank: 0,
	width: 4,
	height: 3,

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="BackgroundHillsStripedSmall-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: `100% ${(3 / 4) * 100}%`,
				}}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 4,
			height: TILE_SIZE * 3,
		};

		return (
			<div className="BackgroundHillsStripedSmall-bg bg-cover" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { BackgroundHillsStripedSmall };
