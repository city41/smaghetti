import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { getBankParam1 } from './util';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';

const BillBlaster: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Bill Blaster',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'stage',
	editorType: 'entity',
	objectId: 0x20,
	emptyBank: 1,
	param1: 'height',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { height: 2 },

	resources: {
		BillBlasterBarrel: {
			romOffset: 0x16ad5c,
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x39ce,
					0x4a52,
					0x6318,
					0x77bd,
					0x267c,
					0x435f,
					0x5bbf,
					0x3d89,
					0x4a0d,
					0x5650,
					0x62b2,
					0x6f15,
					0x7778,
				],
			],
			tiles: [
				[456, 458],
				[457, 459],
			],
		},
		BillBlasterNeck: {
			romOffset: 0x16ad5c,
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x39ce,
					0x4a52,
					0x6318,
					0x77bd,
					0x267c,
					0x435f,
					0x5bbf,
					0x3d89,
					0x4a0d,
					0x5650,
					0x62b2,
					0x6f15,
					0x7778,
				],
			],
			tiles: [
				[460, 462],
				[461, 463],
			],
		},
		BillBlasterBody: {
			romOffset: 0x16ad5c,
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x39ce,
					0x4a52,
					0x6318,
					0x77bd,
					0x267c,
					0x435f,
					0x5bbf,
					0x3d89,
					0x4a0d,
					0x5650,
					0x62b2,
					0x6f15,
					0x7778,
				],
			],
			tiles: [
				[472, 473],
				[472, 473],
			],
		},
	},

	toSpriteBinary({ x, y }) {
		// 0x90 is bullet bill
		// TODO: support flames
		return [1, 0x90, x, y];
	},

	toObjectBinary({ x, y, settings }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		return [getBankParam1(1, height - 1), y, x, this.objectId];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};

		const pieceStyle = {
			width: size / 2,
			height: size / 2,
		};

		return (
			<div className="flex flex-col items-center" style={style}>
				<div className="BillBlasterBarrel-bg bg-cover" style={pieceStyle} />
				<div className="BillBlasterNeck-bg bg-cover" style={pieceStyle} />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;

		const tileSize = { width: TILE_SIZE, height: TILE_SIZE };

		const barrel = (
			<div style={tileSize} className="BillBlasterBarrel-bg bg-cover" />
		);
		const neck =
			height > 1 ? (
				<div style={tileSize} className="BillBlasterNeck-bg bg-cover" />
			) : null;

		const bodyStyle = {
			width: TILE_SIZE,
			height: Math.max(0, height - 2) * TILE_SIZE,
		};

		const body =
			height > 2 ? (
				<div style={bodyStyle} className="BillBlasterBody-bg bg-repeat-y" />
			) : null;

		const style = {
			width: TILE_SIZE,
			height: height * TILE_SIZE,
		};

		return (
			<div
				style={style}
				className={clsx('relative flex flex-col', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				{barrel}
				{neck}
				{body}
				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={{ x: 1, y: height }}
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

export { BillBlaster };
