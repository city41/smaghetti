import React from 'react';
import { FaArrowLeft, FaArrowDown } from 'react-icons/fa';
import { RiFootprintFill } from 'react-icons/ri';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const PlatformWoodMoveLeftFallOnTouch: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Platform - Wood, Move Left, Fall on Touch',
		description: 'Moves left, once Mario lands on it, it falls',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [[5, 7, 8], -1, -1, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x36,
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
					<FaArrowLeft />
					<RiFootprintFill />
					<FaArrowDown />
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

	render({ entity }) {
		const range = (entity?.x ?? 0) / TILE_SIZE;

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
			left: -(TILE_SIZE * range),
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

export { PlatformWoodMoveLeftFallOnTouch };
