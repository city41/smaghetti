import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const GrassChuteDownRight: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-large',
		title: 'Grass Chute - Down Right',
	},

	objectSets: encodeObjectSets([
		[14, 3],
		[3, 3],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x30,
	emptyBank: 0,
	width: 8,
	height: 6,

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="GrassChuteDownRight-bg bg-center bg-no-repeat"
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
			width: TILE_SIZE * 8,
			height: TILE_SIZE * 6,
			backgroundPosition: 'right center',
		};

		return (
			<div className="GrassChuteDownRight-bg bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},

	getWarning({ entity }) {
		if (entity.x < 0) {
			return "Can't extend outside the front of the level";
		}
	},
};

export { GrassChuteDownRight };
