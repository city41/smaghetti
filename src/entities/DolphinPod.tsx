import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';

const DolphinPod: Entity = {
	paletteInfo: {
		title: 'Dolphin Pod',
		description: "They don't hurt Mario, but riding them is challenging...",
		warning:
			"These are strange and don't always work as expected. More research is needed.",
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xa],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6b,

	toSpriteBinary(x, y) {
		return [1, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 50%' };
		return (
			<div
				className="HorizontalDolphin-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const width = TILE_SIZE * 2.5;
		const height = TILE_SIZE;

		const style = { width, height, paddingRight: TILE_SIZE * 1.5 };
		return (
			<div className="HorizontalDolphin-bg bg-cover bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { DolphinPod };
