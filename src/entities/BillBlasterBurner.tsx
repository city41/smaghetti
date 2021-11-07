import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { getBankParam1 } from './util';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';
import { HammerButton } from './detailPanes/HammerButton';

const orientations = [
	'up-left',
	'up-right',
	'down-left',
	'down-right',
] as const;
type Orientation = typeof orientations[number];

const orientationToObjectId: Record<Orientation, number> = {
	'up-left': 0x20,
	'up-right': 0x20,
	'down-left': 0x6e,
	'down-right': 0x6e,
};

const orientationToBurnerId: Record<Orientation, number> = {
	'up-left': 0xac,
	'down-left': 0xac,
	'up-right': 0xb1,
	'down-right': 0xb1,
};

const orientationToFlameLeft: Record<Orientation, number> = {
	'up-left': -TILE_SIZE * 3,
	'up-right': TILE_SIZE,
	'down-right': -TILE_SIZE * 3,
	'down-left': TILE_SIZE,
};

// originally these only had direction: left | right
// this function translates to the new orientation
function getOrientation(settings: EditorEntitySettings): Orientation {
	if (settings.orientation) {
		return settings.orientation;
	} else if (settings.direction === 'left') {
		return 'up-left';
	} else if (settings.direction === 'right') {
		return 'up-right';
	}

	return 'up-left';
}

const BillBlasterBurner: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Bill Blaster - Burner',
		description: 'Shoots fire',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [0, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'stage',
	editorType: 'entity',
	objectId: 0x20,
	emptyBank: 1,
	param1: 'height',
	dimensions: 'none',

	defaultSettings: { height: 2, orientation: 'up-left' },

	resources: {
		BillBlasterBurnerFlame: {
			romOffset: 0x163768,
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x18c6,
					0x101a,
					0x10bf,
					0x125f,
					0x25fd,
					0x369e,
					0x475f,
					0x139f,
					0x177,
					0x21c,
					0x29f,
					0x47bf,
					0x137f,
					0x25f,
				],
			],
			tiles: [
				[64, 65, 66, 67, 68, 69],
				[80, 81, 82, 83, 84, 85],
			],
		},
	},

	toSpriteBinary({ x, y, settings }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const orientation = getOrientation(settings);

		const objectId = orientationToBurnerId[orientation];
		const xOffset = orientation.endsWith('left') ? -3 : 1;
		const yOffset = orientation.startsWith('down') ? height - 1 : 0;

		return [0, objectId, x + xOffset, y + yOffset];
	},

	toObjectBinary({ x, y, settings }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const orientation = getOrientation(settings);

		const objectId = orientationToObjectId[orientation];

		return [getBankParam1(1, height - 1), y, x, objectId];
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
			<div className="flex flex-col items-center relative" style={style}>
				<div className="BillBlasterBarrel-bg bg-cover" style={pieceStyle} />
				<div className="BillBlasterNeck-bg bg-cover" style={pieceStyle} />
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					burner
				</div>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const orientation = getOrientation(settings);

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

		const flameStyle = {
			width: TILE_SIZE * 3,
			height: TILE_SIZE,
			left: orientationToFlameLeft[orientation],
		};

		const flame = (
			<div
				style={flameStyle}
				className={clsx(
					'absolute BillBlasterBurnerFlame-bg bg-cover opacity-30',
					{
						'transform rotate-180':
							orientation === 'up-right' || orientation === 'down-left',
					}
				)}
			/>
		);

		return (
			<div
				style={style}
				className={clsx('relative flex flex-col', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				{!!entity && (
					<HammerButton
						style={{ height: TILE_SIZE }}
						currentValue={orientation}
						values={orientations}
						onNewValue={(newOrientation) => {
							onSettingsChange({ orientation: newOrientation });
						}}
					/>
				)}
				<div
					className={clsx('relative flex flex-col', {
						'transform rotate-180': orientation.startsWith('down'),
					})}
				>
					{barrel}
					{neck}
					{body}
					{flame}
				</div>
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

export { BillBlasterBurner };
