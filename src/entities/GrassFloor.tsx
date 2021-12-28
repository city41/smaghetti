import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1WidthEntityObject,
} from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TILE_SIZE } from '../tiles/constants';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';
import clamp from 'lodash/clamp';

const GrassFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Grass Floor',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { width: 2 },
	dimensions: 'none',
	objectId: 0x2f,
	param1: 'width',
	height: 2,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				32662,
				32767,
				0,
				5586,
				8791,
				11004,
				14270,
				5668,
				11910,
				17229,
				12690,
				5686,
				10908,
				17151,
				5521,
				9786,
			],
		],
		tiles: [
			[350, 351],
			[260, 260],
			[335, 338],
			[
				{
					romOffset: 1486172,
					tileIndex: 186,
				},
				{
					romOffset: 1486172,
					tileIndex: 186,
				},
			],
		],
		romOffset: 1501760,
	},

	toObjectBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseParam1WidthEntityObject(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '50% 100%' };

		return <div className="GrassFloor-bg bg-repeat-x" style={style} />;
	},

	render({ settings, onSettingsChange, entity }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const style = {
			width: width * TILE_SIZE,
			height: 2 * TILE_SIZE,
		};

		return (
			<div
				style={style}
				className={clsx('relative GrassFloor-bg bg-repeat-x', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={{ x: width, y: 1 }}
						increment={TILE_SIZE}
						axis="x"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ width: clamp(newSizePoint.x, 1, 62) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { GrassFloor };
