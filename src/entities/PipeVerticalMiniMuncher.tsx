import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';
import { IconHammer } from '../icons';

import styles from '../components/Resizer/ResizingStyles.module.css';

const MUNCHER_START_OUT_OBJECT_ID = 1;
const MUNCHER_START_OUT_PIPE_OBJECT_ID = 0xa;
const MUNCHER_START_IN_OBJECT_ID = 0;
const MUNCHER_START_IN_PIPE_OBJECT_ID = 0x9;

const PipeVerticalMiniMuncher: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Pipe - Vertical Mini Muncher',
		description:
			'Mini vertical pipes always have Munchers coming out of them. Who knew?',
	},

	objectSets: encodeObjectSets([
		[5, 5],
		[5, 6],
		[5, 8],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { height: 2, muncherStartsOut: true },
	dimensions: 'none',
	param1: 'height',
	objectId: 0x9,
	alternateObjectIds: [
		MUNCHER_START_IN_OBJECT_ID,
		MUNCHER_START_IN_PIPE_OBJECT_ID,
		MUNCHER_START_OUT_OBJECT_ID,
		MUNCHER_START_OUT_PIPE_OBJECT_ID,
	],
	emptyBank: 1,
	width: 1,

	resources: {
		PipeVerticalMiniMuncherLip: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x209,
					0x228e,
					0x3732,
					0x47b7,
					0x1f4,
					0x29a,
					0x37f,
					0x15,
					0xd9d,
					0x2bf,
					0x3600,
					0x4aa5,
					0x5b29,
				],
			],
			tiles: [
				[590, 591],
				[516, 525],
			],
			romOffset: 0x17a894,
		},
		PipeVerticalMiniMuncherBody: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x209,
					0x228e,
					0x3732,
					0x47b7,
					0x1f4,
					0x29a,
					0x37f,
					0x15,
					0xd9d,
					0x2bf,
					0x3600,
					0x4aa5,
					0x5b29,
				],
			],
			tiles: [
				[516, 525],
				[516, 525],
			],
			romOffset: 0x17a894,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const height = settings.height ?? 1;
		const muncherStartsOut = (settings.muncherStartsOut ??
			this.defaultSettings!.muncherStartsOut) as boolean;

		const muncherId = muncherStartsOut
			? MUNCHER_START_OUT_OBJECT_ID
			: MUNCHER_START_IN_OBJECT_ID;
		const pipeId = muncherStartsOut
			? MUNCHER_START_OUT_PIPE_OBJECT_ID
			: MUNCHER_START_IN_PIPE_OBJECT_ID;

		const muncher = [0, y, x, muncherId];
		const pipe = [getBankParam1(1, height - 1), y + 1, x, pipeId];

		return muncher.concat(pipe);
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const cellStyle = { width: size / 2, height: size / 2 };

		return (
			<div style={style} className="flex flex-col items-center">
				<div style={cellStyle} className="Muncher-bg bg-cover" />
				<div
					style={cellStyle}
					className="PipeVerticalMiniMuncherLip-bg bg-cover"
				/>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const muncherStartsOut = (settings.muncherStartsOut ??
			this.defaultSettings!.muncherStartsOut) as boolean;

		const style = {
			width: TILE_SIZE,
			height: (height + 1) * TILE_SIZE,
		};

		const cellStyle = {
			height: TILE_SIZE,
			width: TILE_SIZE,
		};

		const size = { x: 1, y: height };

		const bodyPieces = [];

		for (let i = 0; i < height - 1; ++i) {
			bodyPieces.push(
				<div className="PipeVerticalMiniMuncherBody-bg" style={cellStyle} />
			);
		}

		const lip = (
			<div className="PipeVerticalMiniMuncherLip-bg" style={cellStyle} />
		);

		const muncherStyle = {
			...cellStyle,
			backgroundPositionY: muncherStartsOut ? 0 : TILE_SIZE - 3,
		};

		const muncher = (
			<div
				className="Muncher-bg grid place-items-center bg-no-repeat"
				style={muncherStyle}
			>
				{!!entity && (
					<button
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();

							onSettingsChange({
								muncherStartsOut: !muncherStartsOut,
							});
						}}
					>
						<IconHammer
							style={{ borderRadius: '10%', padding: 0.5 }}
							className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
						/>
					</button>
				)}
			</div>
		);

		return (
			<div
				style={style}
				className={clsx('relative flex flex-col', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				{muncher}
				{lip}
				{bodyPieces}
				{entity && (
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

export { PipeVerticalMiniMuncher };
