import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, getBankParam1 } from './util';
import { Resizer } from '../components/Resizer';
import clamp from 'lodash/clamp';

import styles from '../components/Resizer/ResizingStyles.module.css';

const palette = [
	31775,
	32767,
	0,
	14798,
	19026,
	25368,
	30653,
	9852,
	17247,
	23487,
	15753,
	18957,
	22096,
	25266,
	28437,
	30584,
];

const TankTreads: Entity = {
	// paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-bowsers-army',
		title: 'Tank Treads',
	},

	objectSets: encodeObjectSets([[10, 0x15]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x37,
	emptyBank: 1,
	param1: 'width',
	defaultSettings: {
		width: 3,
	},

	resources: {
		TankTreadsLeft: {
			palettes: [palette],
			tiles: [
				[320, 321],
				[336, 337],
			],
			romOffset: 1565004,
		},
		TankTreadsCenter: {
			palettes: [palette],
			tiles: [
				[332, 334],
				[333, 335],
			],
			romOffset: 1565004,
		},
		TankTreadsRight: {
			palettes: [palette],
			tiles: [
				[322, 323],
				[338, 339],
			],
			romOffset: 1565004,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;
		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};
		const cellStyle = { width: size / 3, height: size / 3 };

		return (
			<div style={style} className="flex flex-row items-center">
				<div style={cellStyle} className="TankTreadsLeft-bg bg-cover" />
				<div style={cellStyle} className="TankTreadsCenter-bg bg-cover" />
				<div style={cellStyle} className="TankTreadsRight-bg bg-cover" />
			</div>
		);
	},

	render({ settings, entity, onSettingsChange }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const style = {
			width: width * TILE_SIZE,
			height: TILE_SIZE,
		};

		const leftAndRightStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const centerStyle = {
			width: (width - 2) * TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div
				style={style}
				className={clsx('relative flex flex-row', {
					[styles.resizing]: settings.resizing,
				})}
			>
				<div style={leftAndRightStyle} className="TankTreadsLeft-bg bg-cover" />
				<div style={centerStyle} className="TankTreadsCenter-bg repeat-x" />
				<div
					style={leftAndRightStyle}
					className="TankTreadsRight-bg bg-cover"
				/>

				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={{ x: width, y: 1 }}
						increment={TILE_SIZE}
						axis="x"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ width: clamp(newSizePoint.x, 2, 63) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { TankTreads };
