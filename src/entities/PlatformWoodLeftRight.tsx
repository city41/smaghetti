import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { HammerButton } from './detailPanes/HammerButton';

const ranges = [4, 6] as const;
type Range = typeof ranges[number];

const travelRangeToObjectId: Record<Range, number> = {
	4: 0x37,
	6: 0x27,
};

const PlatformWoodLeftRight: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Platform - Wood Left/Right',
		description: 'Goes left and right, two possible ranges',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [[5, 7, 8], -1, -1, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x37,
	alternateObjectIds: Object.values(travelRangeToObjectId),
	width: 3,
	height: 1,
	settingsType: 'single',
	defaultSettings: { range: 6 },

	toSpriteBinary({ x, y, settings }) {
		const range = (settings.range ?? this.defaultSettings!.range) as Range;
		const objectId = travelRangeToObjectId[range];
		return [0, objectId, x, y];
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
					<FaArrowRight />
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

	render({ settings, onSettingsChange, entity }) {
		const range = (settings.range ?? this.defaultSettings!.range) as Range;

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
			left: -TILE_SIZE * range,
		};

		const rangeBox = (
			<div
				className="absolute w-full opacity-20 bg-green-500 pointer-events-none"
				style={rangeStyle}
			>
				{platform}
			</div>
		);

		return (
			<div className="relative" style={style}>
				{platform}
				{rangeBox}
				{!!entity && (
					<HammerButton
						currentValue={range}
						values={ranges}
						onNewValue={(newRange) => {
							onSettingsChange({ range: newRange });
						}}
					/>
				)}
			</div>
		);
	},
};

export { PlatformWoodLeftRight };
