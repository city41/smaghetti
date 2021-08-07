import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';

const PipeVerticalMini: Entity = {
	// paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Pipe - Vertical Mini',
		description: "No mini mario in this game, so can't go inside...",
	},

	objectSets: encodeObjectSets([
		[5, 5],
		[5, 6],
		[5, 8],
		[11, 5],
		[11, 6],
		[11, 8],
		[13, 5],
		[13, 6],
		[13, 8],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { height: 2 },
	dimensions: 'none',
	param1: 'height',
	objectId: 0x9,
	emptyBank: 1,
	width: 1,

	resource: {
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
			[516, 525],
			[516, 525],
		],
		romOffset: 0x17a894,
	},

	toObjectBinary({ x, y, settings }) {
		const height = settings.height ?? 1;

		return [getBankParam1(1, height - 1), y, x, this.objectId];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '50% 100%' };

		return (
			<div
				style={style}
				className="PipeVerticalMini-bg bg-center bg-no-repeat"
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;

		const style = {
			width: TILE_SIZE,
			height: height * TILE_SIZE,
		};

		const lipStyle = {
			height: TILE_SIZE,
			width: TILE_SIZE,
		};

		const size = { x: 1, y: height };

		const bodyStyle = {
			height: TILE_SIZE,
			width: TILE_SIZE,
			backgroundPositionY: -TILE_SIZE,
			backgroundSize: `${TILE_SIZE}px ${2 * TILE_SIZE}px`,
		};

		const bodyPieces = [];

		for (let i = 0; i < height - 1; ++i) {
			bodyPieces.push(
				<div className="PipeVerticalMini-bg" style={bodyStyle} />
			);
		}

		const lip = <div className="PipeVerticalMini-bg" style={lipStyle} />;

		return (
			<div
				style={style}
				className={clsx('relative flex flex-col', {
					[styles.resizing]: settings?.resizing,
				})}
			>
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

export { PipeVerticalMini };
