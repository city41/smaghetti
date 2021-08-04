import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';

const TRAVEL_RANGE_IN_TILES = 6;

const PlatformWoodUpDown: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Platform - Wood Up/Down',
		description: 'Just goes up and down, not configurable',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [[5, 7, 8], -1, -1, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x28,
	width: 3,
	height: 1,

	toSpriteBinary(x, y) {
		return [0, 0x28, x, y];
	},

	simpleRender(size) {
		const cellStyle = { width: size / 3, height: size / 3 };

		return (
			<div
				className="flex flex-row items-center"
				style={{ width: size, height: size }}
			>
				<div className="WoodPlatformLeft-bg bg-cover" style={cellStyle} />
				<div className="WoodPlatform-bg bg-cover" style={cellStyle} />
				<div className="WoodPlatformRight-bg bg-cover" style={cellStyle} />
			</div>
		);
	},

	render() {
		const platformStyle = { width: TILE_SIZE * 3, height: TILE_SIZE };
		const cellStyle = { width: TILE_SIZE, height: TILE_SIZE };

		const platform = (
			<div className="flex flex-row items-center" style={platformStyle}>
				<div className="WoodPlatformLeft-bg bg-cover" style={cellStyle} />
				<div className="WoodPlatform-bg bg-cover" style={cellStyle} />
				<div className="WoodPlatformRight-bg bg-cover" style={cellStyle} />
			</div>
		);

		const rangeStyle = {
			height: TILE_SIZE * TRAVEL_RANGE_IN_TILES,
			top: -TILE_SIZE * TRAVEL_RANGE_IN_TILES,
		};

		const range = (
			<div
				className="absolute w-full opacity-20 bg-green-500 pointer-events-none"
				style={rangeStyle}
			>
				{platform}
			</div>
		);

		return (
			<div className="relative">
				{platform}
				{range}
			</div>
		);
	},
};

export { PlatformWoodUpDown };
