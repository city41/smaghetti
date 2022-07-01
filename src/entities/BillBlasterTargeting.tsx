import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { getBankParam1 } from './util';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';
import { HammerButton } from './detailPanes/HammerButton';

const orientations = ['up', 'down'] as const;
type Orientation = typeof orientations[number];

const orientationToObjectId: Record<Orientation, number> = {
	up: 0x20,
	down: 0x6e,
};

const BillBlasterTargeting: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Bill Blaster - Targeting',
		description: 'Shoots Targeting Bills, which seek out Mario',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, 4, ANY_BELOW_0x16],
	layer: 'stage',
	editorType: 'entity',
	objectId: 0x20,
	alternateObjectIds: Object.values(orientationToObjectId),
	emptyBank: 1,
	param1: 'height',
	dimensions: 'none',

	defaultSettings: { height: 2, orientation: 'up' },

	toSpriteBinary({ x, y, settings }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const orientation = (settings.orientation ??
			this.defaultSettings!.orientation) as Orientation;

		const yOffset = orientation === 'down' ? height - 1 : 0;

		return [0, 1, x, y + yOffset];
	},

	toObjectBinary({ x, y, settings }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const orientation = (settings.orientation ??
			this.defaultSettings!.orientation) as Orientation;

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
			<div className="relative flex flex-col items-center" style={style}>
				<div className="BillBlasterBarrel-bg bg-cover" style={pieceStyle} />
				<div className="BillBlasterNeck-bg bg-cover" style={pieceStyle} />
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					Targeting
				</div>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const orientation = (settings.orientation ??
			this.defaultSettings!.orientation) as Orientation;

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

		const bulletBillStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			left: -TILE_SIZE / 2 - 1,
			zIndex: -1,
			opacity: 0.5,
		};

		const bulletBillRotateStyle =
			orientation === 'up'
				? {
						transform: 'rotate(10deg)',
				  }
				: {
						transform: 'scale(1, -1) rotate(10deg)',
				  };

		const orientationStyle =
			orientation === 'up'
				? {}
				: {
						transform: 'scale(1, -1)',
				  };

		return (
			<div
				style={style}
				className={clsx('relative flex flex-col', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				<div className="relative flex flex-col" style={orientationStyle}>
					<div
						className="absolute right-0 BulletBillTargeting-bg bg-cover"
						style={{ ...bulletBillStyle, ...bulletBillRotateStyle }}
					/>
					{barrel}
					{neck}
					{body}
				</div>
				{!!entity && (
					<>
						<HammerButton
							style={{ height: TILE_SIZE }}
							currentValue={orientation}
							values={orientations}
							onNewValue={(newOrientation) => {
								onSettingsChange({ orientation: newOrientation });
							}}
						/>

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
					</>
				)}
			</div>
		);
	},
};

export { BillBlasterTargeting };
