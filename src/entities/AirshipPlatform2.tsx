import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

import styles from '../components/Resizer/ResizingStyles.module.css';
import { Resizer } from '../components/Resizer';
import { HammerButton } from './detailPanes/HammerButton';

/**
 * This is essentially the same entity as AirshipPlatform except:
 * - its objectid is 0 instead of 1
 * - it's five bytes, with the fifth byte being height
 *
 * not sure if this will ever be brought into Smaghetti
 */

const caps = [
	'flat-flat',
	'shallow-flat',
	'deep-flat',
	'shallow-shallow',
	'deep-shallow',
] as const;

const twoWideCaps = [
	'flat-flat',
	'shallow-flat',
	'deep-flat',
	'shallow-shallow',
] as const;

type Cap = typeof caps[number];

const AirshipPlatform2: Entity = {
	paletteCategory: 'binary',
	paletteInfo: {
		title: 'Airship Platform 2',
		description:
			'an alternate version of Airship Platform that takes a height param',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',

	defaultSettings: { width: 3, cap: 'flat-flat' },
	param1: 'width',
	param2: 'height',
	objectId: 0x0,
	alternateObjectIds: [0x33, 0x2a, 3],
	emptyBank: 1,

	toObjectBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;
		// this is a valid param, creates rows of platforms
		const height = 0;
		const cap = (settings.cap ?? this.defaultSettings!.cap) as Cap;

		const bodyId = cap.endsWith('flat') ? this.objectId : 0x33;

		const bodyBytes = [getBankParam1(1, width - 1), y, x, bodyId, height];
		const leftCapBytes = cap.startsWith('flat')
			? []
			: cap.startsWith('shallow')
			? [0, y, x, 3]
			: [0, y, x, 0x2a];

		return bodyBytes.concat(leftCapBytes);
	},

	simpleRender(size) {
		const cellStyle = {
			width: size / 2,
			height: size / 2,
		};

		return (
			<div
				className="flex flex-row items-center"
				style={{ width: size, height: size }}
			>
				<div
					style={cellStyle}
					className="AirshipPlatformLeftShallow-bg bg-cover"
				/>
				<div
					style={cellStyle}
					className="AirshipPlatformRightFlat-bg bg-cover"
				/>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const width = settings.width ?? this.defaultSettings!.width;
		const cap = (settings.cap ?? this.defaultSettings!.cap) as Cap;

		const style = {
			width: width * TILE_SIZE,
			height: TILE_SIZE,
		};

		const leftCapWidth = cap.startsWith('deep') ? 2 : 1;
		const rightCapWidth = cap.startsWith('deep') && width === 2 ? 0 : 1;

		const leftCapStyle = {
			width: leftCapWidth * TILE_SIZE,
			height: TILE_SIZE,
		};

		const rightCapStyle = {
			width: rightCapWidth * TILE_SIZE,
			height: TILE_SIZE,
		};

		const bodyStyle = {
			width: (width - leftCapWidth - rightCapWidth) * TILE_SIZE,
			height: TILE_SIZE,
		};

		const size = { x: width, y: 1 };

		const leftCapEl = (
			<div
				className={clsx({
					'AirshipPlatformLeftFlat-bg': cap.startsWith('flat'),
					'AirshipPlatformLeftDeep-bg': cap.startsWith('deep'),
					'AirshipPlatformLeftShallow-bg': cap.startsWith('shallow'),
				})}
				style={leftCapStyle}
			/>
		);
		const body =
			width > 2 ? (
				<div className="AirshipPlatform-bg bg-repeat-x" style={bodyStyle} />
			) : null;

		const rightCapEl = (
			<div
				className={clsx({
					'AirshipPlatformRightFlat-bg': cap.endsWith('flat'),
					'AirshipPlatformRightShallow-bg': cap.endsWith('shallow'),
				})}
				style={rightCapStyle}
			/>
		);

		return (
			<div
				className={clsx('relative flex flex-row', {
					[styles.resizing]: settings?.resizing,
				})}
				style={style}
			>
				{leftCapEl}
				{body}
				{rightCapEl}
				{entity && (
					<>
						<div className="absolute w-full h-full flex flex-row justify-center align-center gap-x-0.5 z-10">
							<HammerButton
								values={width === 2 ? twoWideCaps : caps}
								currentValue={cap}
								onNewValue={(newCap) => {
									onSettingsChange({
										cap: newCap,
									});
								}}
							/>
						</div>
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
					</>
				)}
			</div>
		);
	},
};

export { AirshipPlatform2 };
