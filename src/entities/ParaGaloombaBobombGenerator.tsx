import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

const ParaGaloombaBobombGenerator: Entity = {
	// paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Para Galoomba/Bobomb Generator',
		description:
			'This generator makes either galoombas or bobombs, depending on if its x location is even or odd',
		warning:
			'These are strange and kinda hard to use, need to think on them more',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, 0, -1, -1, 6],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6d,

	toSpriteBinary(x, y) {
		return [1, this.objectId, x, y, 5];
	},

	simpleRender(size) {
		return (
			<div
				className="relative GaloombaWithParachute-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: '50% 100%',
				}}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					gen
				</div>
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
			marginTop: -TILE_SIZE,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: TILE_SIZE,
		};

		const labelStyle = {
			fontSize: 2,
			bottom: 0,
		};

		return (
			<div style={style} className="relative GaloombaWithParachute-bg bg-cover">
				<TileSpace style={spaceStyle} className="absolute" />
				<div
					className="absolute left-0 w-full text-center bg-black text-white"
					style={labelStyle}
				>
					gen
				</div>
			</div>
		);
	},
};

export { ParaGaloombaBobombGenerator };
