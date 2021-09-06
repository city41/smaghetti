import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
} from './util';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';

const WoodColumn: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-airship',
		title: 'Wood Column',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x4,
	emptyBank: 1,
	param1: 'width',
	settingsType: 'single',
	defaultSettings: { width: 1 },
	height: 3,

	resource: {
		palettes: [
			[
				32662,
				32767,
				0,
				17932,
				23185,
				28469,
				32731,
				8378,
				8606,
				15007,
				304,
				435,
				6711,
				11931,
				16158,
				19359,
			],
		],
		tiles: [
			[266, 269],
			[298, 301],
			[282, 285],
			[298, 301],
			[314, 303],
			[286, 319],
		],
		romOffset: 1501760,
	},

	toObjectBinary({ x, y, settings }) {
		const width = settings.width ?? this.defaultSettings!.width;

		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Width(data, offset, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '33% 100%',
		};
		return (
			<div className="WoodColumn-bg bg-no-repeat bg-center" style={style} />
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const width = settings.width ?? this.defaultSettings!.width;

		const style = {
			width: width * TILE_SIZE,
			height: 3 * TILE_SIZE,
		};

		const size = { x: width, y: 1 };

		return (
			<div
				className={clsx('WoodColumn-bg bg-repeat-x', {
					[styles.resizing]: settings?.resizing,
				})}
				style={style}
			>
				{entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE}
						axis="x"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ width: Math.max(1, newSizePoint.x) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { WoodColumn };
