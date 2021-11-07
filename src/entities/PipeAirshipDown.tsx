import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1HeightEntityObject,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';

const PipeAirshipDown: Entity = {
	paletteCategory: 'transport',
	paletteInfo: {
		title: 'Pipe - Airship Down',
		description:
			'You can not use this pipe as the start of a warp, but it can be a warp destination.',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { height: 2 },
	dimensions: 'none',
	param1: 'height',
	objectId: 0x3a,
	emptyBank: 1,
	width: 2,

	toObjectBinary({ x, y, settings }) {
		const height = settings.height ?? 1;

		return [getBankParam1(1, height - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseParam1HeightEntityObject(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const lipStyle = { width: size, height: size / 4 };
		const bodyStyle = {
			width: size,
			height: size - size / 4,
			backgroundSize: '100%',
		};

		return (
			<div className="flex flex-col items-center" style={style}>
				<div
					className="PipeAirshipVerticalBody-bg bg-repeat-y"
					style={bodyStyle}
				/>
				<div className="PipeAirshipVerticalLip-bg bg-cover" style={lipStyle} />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;

		const style = {
			width: 2 * TILE_SIZE,
			height: height * TILE_SIZE,
		};

		const lipStyle = {
			width: 2 * TILE_SIZE,
			height: TILE_SIZE / 2,
		};

		const bodyHeight = Math.max(height - 0.5, 0);
		const bodyStyle = {
			width: 2 * TILE_SIZE,
			height: bodyHeight * TILE_SIZE,
		};

		const size = { x: 1, y: height };

		const lip = (
			<div
				className="PipeAirshipVerticalLip-bg bg-cover"
				style={lipStyle}
			></div>
		);

		const body = (
			<div
				className="PipeAirshipVerticalBody-bg bg-repeat-y"
				style={bodyStyle}
			/>
		);

		return (
			<div
				style={style}
				className={clsx('relative flex flex-col', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				{body}
				{lip}
				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE}
						axis="y"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ height: Math.max(1, newSizePoint.y) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { PipeAirshipDown };
