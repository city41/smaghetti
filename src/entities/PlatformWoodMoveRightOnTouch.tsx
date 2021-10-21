import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';
import { IconArrowRight, IconFootprint } from '../icons';

const PlatformWoodMoveRightOnTouch: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Platform - Wood, Move Right on Touch',
		description: 'Once Mario lands on it, it continually moves to the right',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [[5, 7, 8], -1, -1, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x26,
	width: 3,
	height: 1,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const cellStyle = { width: size / 3, height: size / 3 };

		return (
			<div
				className="flex flex-col items-center justify-start"
				style={{ width: size, height: size }}
			>
				<div className="flex flex-row items-center justify-center">
					<IconFootprint />
					<IconArrowRight />
				</div>
				<div
					className="flex flex-row items-center"
					style={{ width: size, height: size / 3 }}
				>
					<div className="WoodPlatformLeft-bg bg-cover" style={cellStyle} />
					<div className="WoodPlatform-bg bg-cover" style={cellStyle} />
					<div className="WoodPlatformRight-bg bg-cover" style={cellStyle} />
				</div>
			</div>
		);
	},

	render({ entity, room }) {
		const range = Math.max(
			0,
			(room?.roomTileWidth ?? 0) - ((entity?.x ?? 0) / TILE_SIZE + 3)
		);

		const style = { width: TILE_SIZE * 3, height: TILE_SIZE };
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
			width: TILE_SIZE * range,
			height: TILE_SIZE,
			top: 0,
			left: style.width,
		};

		const rangeBox = (
			<div
				className="absolute w-full opacity-20 bg-green-500 pointer-events-none"
				style={rangeStyle}
			/>
		);

		return (
			<div className="relative" style={style}>
				{platform}
				{rangeBox}
			</div>
		);
	},
};

export { PlatformWoodMoveRightOnTouch };
