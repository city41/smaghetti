import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TILE_SIZE } from '../tiles/constants';
import { Resizer } from '../components/Resizer';
import clamp from 'lodash/clamp';

import styles from '../components/Resizer/ResizingStyles.module.css';

const CloudPlatformThick: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-sky',
		title: 'Cloud Platform - Thick',
	},

	objectSets: encodeObjectSets([
		[11, 13],
		[13, 13],
		[5, 13],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { width: 2 },
	dimensions: 'none',
	objectId: 0xd,
	param1: 'height',
	param2: 'width',
	height: 2,
	emptyBank: 1,

	resources: {
		CloudPlatformThickLeft: {
			palettes: [
				[
					31744,
					32767,
					0,
					26019,
					31371,
					32622,
					32726,
					5524,
					11833,
					17085,
					8800,
					10952,
					15180,
					18352,
					8767,
					22515,
				],
				[
					31744,
					0,
					32767,
					24035,
					31400,
					5278,
					607,
					9055,
					8973,
					0,
					0,
					0,
					25535,
					0,
					0,
					0,
				],
				[
					0x7f96,
					0x7fff,
					0x0,
					0x39ce,
					0x4a52,
					0x6318,
					0x77bd,
					0x732c,
					0x7fd2,
					0x7ffb,
					0x5810,
					0x7597,
					0x7e1d,
					0x0,
					0x0,
					0x0,
					0xc,
				],
			],
			tiles: [
				[584, 585, { tileIndex: 526, palette: 2 }],
				[
					530,
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
				],
				[
					546,
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
				],
				[547, 557, 558],
			],
			romOffset: 1501760,
		},
		CloudPlatformThickCenter: {
			palettes: [
				[
					31744,
					32767,
					0,
					26019,
					31371,
					32622,
					32726,
					5524,
					11833,
					17085,
					8800,
					10952,
					15180,
					18352,
					8767,
					22515,
				],
				[
					31744,
					0,
					32767,
					24035,
					31400,
					5278,
					607,
					9055,
					8973,
					0,
					0,
					0,
					25535,
					0,
					0,
					0,
				],
				[
					0x7f96,
					0x7fff,
					0x0,
					0x39ce,
					0x4a52,
					0x6318,
					0x77bd,
					0x732c,
					0x7fd2,
					0x7ffb,
					0x5810,
					0x7597,
					0x7e1d,
					0x0,
					0x0,
					0x0,
					0xc,
				],
			],
			tiles: [
				[527, { tileIndex: 526, palette: 2 }],
				[
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
				],
				[
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
				],
				[557, 558],
			],
			romOffset: 1501760,
		},
		CloudPlatformThickRight: {
			palettes: [
				[
					31744,
					32767,
					0,
					26019,
					31371,
					32622,
					32726,
					5524,
					11833,
					17085,
					8800,
					10952,
					15180,
					18352,
					8767,
					22515,
				],
				[
					31744,
					0,
					32767,
					24035,
					31400,
					5278,
					607,
					9055,
					8973,
					0,
					0,
					0,
					25535,
					0,
					0,
					0,
				],
			],
			tiles: [
				[527, 586, 587],
				[
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
					528,
				],
				[
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
					{
						romOffset: 1253344,
						tileIndex: 78,
						palette: 1,
					},
					544,
				],
				[557, 558, 545],
			],
			romOffset: 1501760,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		return [getBankParam1(1, 2), y - 1, x, this.objectId, width - 2];
	},

	simpleRender(size) {
		const style = { width: size, height: size };

		const leftStyle = {
			width: (size * 3) / 8,
			height: size / 2,
		};

		const centerStyle = {
			width: size / 4,
			height: size / 2,
		};

		const rightStyle = {
			width: (size * 3) / 8,
			height: size / 2,
			backgroundPositionX: 'right',
		};

		return (
			<div className="flex flex-row items-center" style={style}>
				<div style={leftStyle} className="CloudPlatformThickLeft-bg bg-cover" />
				<div
					style={centerStyle}
					className="CloudPlatformThickCenter-bg bg-cover"
				/>
				<div
					style={rightStyle}
					className="CloudPlatformThickRight-bg bg-cover"
				/>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const style = {
			width: width * TILE_SIZE,
			height: 2 * TILE_SIZE,
			marginTop: -TILE_SIZE / 2,
		};

		const sideStyle = {
			width: width === 2 ? TILE_SIZE : TILE_SIZE * 1.5,
			height: 2 * TILE_SIZE,
		};

		const centerStyle = {
			width: Math.max(0, width - 3) * TILE_SIZE,
			height: 2 * TILE_SIZE,
		};

		return (
			<div
				style={style}
				className={clsx('relative flex flex-row', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				<div style={sideStyle} className="CloudPlatformThickLeft-bg" />
				<div
					style={centerStyle}
					className="CloudPlatformThickCenter-bg bg-repeat-x"
				/>
				<div
					style={{ ...sideStyle, backgroundPositionX: 'right' }}
					className="CloudPlatformThickRight-bg"
				/>
				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={{ x: width, y: 1 }}
						increment={TILE_SIZE}
						axis="x"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ width: clamp(newSizePoint.x, 2, 64) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { CloudPlatformThick };
