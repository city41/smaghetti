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

const PipeHorizontalMiniDoubleEnded: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Pipe - Horizontal Mini, Double Ended',
	},

	objectSets: encodeObjectSets([
		[6, 5],
		[6, 6],
		[6, 8],
		[8, 5],
		[8, 6],
		[8, 8],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { width: 2 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x35,
	emptyBank: 1,
	height: 1,

	resources: {
		PipeHorizontalMiniDoubleEndedLip: {
			palettes: [
				[
					31744,
					32767,
					0,
					515,
					682,
					880,
					980,
					500,
					666,
					895,
					436,
					6712,
					11932,
					15102,
					666,
					895,
				],
			],
			tiles: [[584], [600]],
			romOffset: 1550484,
		},

		PipeHorizontalMiniDoubleEndedBody: {
			palettes: [
				[
					31744,
					32767,
					0,
					515,
					682,
					880,
					980,
					500,
					666,
					895,
					436,
					6712,
					11932,
					15102,
					666,
					895,
				],
			],
			tiles: [[585], [601]],
			romOffset: 1550484,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const width = settings.width ?? this.defaultSettings!.width;

		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseParam1WidthEntityObject(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const cellStyle = {
			width: size / 4,
			height: size / 2,
			backgroundSize: '100%',
		};

		return (
			<div style={style} className="flex flex-row items-center">
				<div
					style={cellStyle}
					className="PipeHorizontalMiniDoubleEndedLip-bg"
				/>
				<div
					style={cellStyle}
					className="PipeHorizontalMiniDoubleEndedBody-bg"
				/>
				<div
					style={cellStyle}
					className="PipeHorizontalMiniDoubleEndedBody-bg"
				/>
				<div
					style={cellStyle}
					className="PipeHorizontalMiniDoubleEndedLip-bg"
				/>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const style = {
			height: TILE_SIZE,
			width: width * TILE_SIZE,
		};

		const lipStyle = {
			height: TILE_SIZE,
			width: TILE_SIZE / 2,
		};

		const size = { x: width, y: 1 };

		const bodyStyle = {
			height: TILE_SIZE,
			width: (width - 1) * TILE_SIZE,
		};

		const lip = (
			<div className="PipeHorizontalMiniDoubleEndedLip-bg" style={lipStyle} />
		);
		const body = (
			<div className="PipeHorizontalMiniDoubleEndedBody-bg" style={bodyStyle} />
		);

		return (
			<div
				style={style}
				className={clsx('relative flex flex-row', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				{lip}
				{body}
				{lip}
				{entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE}
						axis="x"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ width: Math.max(2, newSizePoint.x) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { PipeHorizontalMiniDoubleEnded };
