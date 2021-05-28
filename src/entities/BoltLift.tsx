import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

// const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const BoltLift: Entity = {
	paletteInfo: {
		title: 'Bolt Lift',
		warning: 'These need bolts to be of any use',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, 0, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xae,

	resource: {
		romOffset: 0x163768,
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x39ce,
			0x4a52,
			0x5ef7,
			0x7a8b,
			0x7f6e,
			0x7fd6,
			0x6f7b,
			0x19f8,
			0x2e5c,
			0x42ff,
			0x1b1f,
			0x1a1f,
			0x1d,
		],
		tiles: [[42], [58]],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="BoltLift-bg bg-repeat-x"
				style={{
					width: size,
					height: size,
					backgroundSize: '25% 50%',
					backgroundPositionY: 'center',
				}}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div className="relative BoltLift-bg" style={style}>
				<div className="absolute top-0 left-0" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { BoltLift };
