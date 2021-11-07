import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1WidthEntityObject,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';

const WoodFloorGiant: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-giant',
		title: 'Wood Floor - Giant',
	},

	objectSets: encodeObjectSets([
		[11, 11],
		[13, 11],
		[5, 11],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { logicalWidth: 1, width: 2 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x6,
	emptyBank: 1,
	height: 2,

	resource: {
		palettes: [
			[
				32662,
				32767,
				0,
				379,
				6687,
				12959,
				19327,
				13924,
				18186,
				24497,
				3443,
				6648,
				11869,
				16095,
				0,
				0,
			],
		],
		tiles: [
			[975, 975],
			[915, 991],
			[1004, 1005],
			[1020, 1021],
		],
		romOffset: 1534952,
	},

	toObjectBinary({ x, y, settings }) {
		const logicalWidth =
			settings.logicalWidth ?? this.defaultSettings!.logicalWidth;

		return [getBankParam1(1, logicalWidth - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseParam1WidthEntityObject(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="WoodFloorGiant-bg bg-repeat-x"
				style={{ width: size, height: size, backgroundSize: '50% 100%' }}
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const logicalWidth =
			settings.logicalWidth ?? this.defaultSettings!.logicalWidth;

		const style = {
			width: logicalWidth * TILE_SIZE * 2,
			height: TILE_SIZE * 2,
		};

		const size = { x: logicalWidth, y: 1 };

		return (
			<div
				className={clsx('relative WoodFloorGiant-bg bg-repeat-x', {
					[styles.resizing]: settings?.resizing,
				})}
				style={style}
			>
				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE * 2}
						axis="x"
						onSizeChange={(newSizePoint) => {
							const newLogicalWidth = Math.max(1, newSizePoint.x);
							onSettingsChange({
								logicalWidth: newLogicalWidth,
								width: newLogicalWidth * 2,
							});
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { WoodFloorGiant };
