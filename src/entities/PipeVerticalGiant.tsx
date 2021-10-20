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

const PipeVerticalGiant: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-giant',
		title: 'Pipe - Vertical Giant',
	},

	objectSets: encodeObjectSets([
		[13, 11],
		[11, 11],
		[5, 11],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { height: 3 },
	dimensions: 'none',
	param1: 'height',
	objectId: 0x7,
	emptyBank: 1,
	width: 3,

	resources: {
		PipeVerticalGiantLip: {
			palettes: [
				[
					31744,
					32767,
					0,
					548,
					682,
					880,
					980,
					500,
					666,
					895,
					21,
					3485,
					703,
					0,
					0,
					0,
				],
			],
			tiles: [
				[
					{
						romOffset: 1486172,
						tileIndex: 448,
					},
					969,
					970,
					971,
					{
						romOffset: 1486172,
						tileIndex: 450,
					},
					{
						romOffset: 1486172,
						tileIndex: 451,
					},
				],
				[
					984,
					985,
					{
						romOffset: 1584308,
						tileIndex: 130,
					},
					987,
					1016,
					1017,
				],
				[
					{
						romOffset: 1472116,
						tileIndex: 821,
					},
					1001,
					1002,
					1003,
					{
						romOffset: 1486172,
						tileIndex: 466,
					},
					{
						romOffset: 1472116,
						tileIndex: 823,
					},
				],
				[
					{
						romOffset: 1472116,
						tileIndex: 825,
					},
					{
						romOffset: 1486172,
						tileIndex: 481,
					},
					{
						romOffset: 1584308,
						tileIndex: 131,
					},
					1019,
					{
						romOffset: 1486172,
						tileIndex: 482,
					},
					{
						romOffset: 1472116,
						tileIndex: 827,
					},
				],
			],
			romOffset: 1534952,
		},
		PipeVerticalGiantBody: {
			palettes: [
				[
					31744,
					32767,
					0,
					548,
					682,
					880,
					980,
					500,
					666,
					895,
					21,
					3485,
					703,
					0,
					0,
					0,
				],
			],
			tiles: [
				[
					{
						romOffset: 1472116,
						tileIndex: 825,
					},
					{
						romOffset: 1486172,
						tileIndex: 481,
					},
					{
						romOffset: 1584308,
						tileIndex: 131,
					},
					1019,
					{
						romOffset: 1486172,
						tileIndex: 482,
					},
					{
						romOffset: 1472116,
						tileIndex: 827,
					},
				],
				[
					{
						romOffset: 1472116,
						tileIndex: 825,
					},
					{
						romOffset: 1486172,
						tileIndex: 481,
					},
					{
						romOffset: 1584308,
						tileIndex: 131,
					},
					1019,
					{
						romOffset: 1486172,
						tileIndex: 482,
					},
					{
						romOffset: 1472116,
						tileIndex: 827,
					},
				],
			],
			romOffset: 1534952,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const height = settings.height ?? 1;

		return [getBankParam1(1, height - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseParam1HeightEntityObject(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const lipStyle = { width: size, height: (size * 2) / 3 };
		const bodyStyle = { width: size, height: size / 3, backgroundSize: '100%' };

		return (
			<div className="flex flex-col" style={style}>
				<div className="PipeVerticalGiantLip-bg bg-cover" style={lipStyle} />
				<div
					className="PipeVerticalGiantBody-bg bg-repeat-y"
					style={bodyStyle}
				/>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;

		const style = {
			width: 3 * TILE_SIZE,
			height: height * TILE_SIZE,
		};

		const lipStyle = {
			width: 3 * TILE_SIZE,
			height: 2 * TILE_SIZE,
		};

		const bodyHeight = Math.max(height - 2, 0);
		const bodyStyle = {
			width: 3 * TILE_SIZE,
			height: bodyHeight * TILE_SIZE,
		};

		const size = { x: 1, y: height };

		const upperLip = (
			<div className="PipeVerticalGiantLip-bg bg-cover" style={lipStyle}></div>
		);

		const body = (
			<div className="PipeVerticalGiantBody-bg bg-repeat-y" style={bodyStyle} />
		);

		return (
			<div
				style={style}
				className={clsx('relative flex flex-col', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				{upperLip}
				{body}
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

export { PipeVerticalGiant };
