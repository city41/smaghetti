import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';
import { parseSimpleSprite } from './util';

const BoltLift: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Bolt Lift',
		description: 'Place these on bolts, Mario can spin them',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, 0, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xae,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="BoltNut-bg bg-repeat-x"
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
			<div className="relative BoltNut-bg" style={style}>
				<div className="absolute top-0 left-0" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { BoltLift };
