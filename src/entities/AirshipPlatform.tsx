import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { FaHammer } from 'react-icons/fa';

import styles from '../components/Resizer/ResizingStyles.module.css';
import { Resizer } from '../components/Resizer';

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

const AirshipPlatform: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-airship',
		title: 'Airship Platform',
		description: 'Can be tapered or flat on each end',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { width: 3, cap: 'flat-flat' },
	param1: 'ignored',
	param2: 'width',
	objectId: 0x1,
	alternateObjectIds: [0x33, 0x2a, 3],
	emptyBank: 1,

	resources: {
		AirshipPlatformLeftFlat: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x460c,
					0x5a91,
					0x6f35,
					0x7fdb,
					0x20ba,
					0x219e,
					0x3a9f,
					0x130,
					0x1b3,
					0x1a37,
					0x2e9b,
					0x3f1e,
					0x4b9f,
				],
			],
			romOffset: 0x16ea40,
			tiles: [
				[256, 258],
				[304, 306],
			],
		},
		AirshipPlatformLeftShallow: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x460c,
					0x5a91,
					0x6f35,
					0x7fdb,
					0x20ba,
					0x219e,
					0x3a9f,
					0x130,
					0x1b3,
					0x1a37,
					0x2e9b,
					0x3f1e,
					0x4b9f,
				],
			],
			romOffset: 0x16ea40,
			tiles: [
				[290, 258],
				[291, 326],
			],
		},
		AirshipPlatformLeftDeep: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x460c,
					0x5a91,
					0x6f35,
					0x7fdb,
					0x20ba,
					0x219e,
					0x3a9f,
					0x130,
					0x1b3,
					0x1a37,
					0x2e9b,
					0x3f1e,
					0x4b9f,
				],
			],
			romOffset: 0x16ea40,
			tiles: [
				[325, 276, 257, 258],
				[262, 327, 328, 306],
			],
		},
		AirshipPlatform: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x460c,
					0x5a91,
					0x6f35,
					0x7fdb,
					0x20ba,
					0x219e,
					0x3a9f,
					0x130,
					0x1b3,
					0x1a37,
					0x2e9b,
					0x3f1e,
					0x4b9f,
				],
			],
			romOffset: 0x16ea40,
			tiles: [
				[257, 258],
				[305, 306],
			],
		},
		AirshipPlatformRightFlat: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x460c,
					0x5a91,
					0x6f35,
					0x7fdb,
					0x20ba,
					0x219e,
					0x3a9f,
					0x130,
					0x1b3,
					0x1a37,
					0x2e9b,
					0x3f1e,
					0x4b9f,
				],
			],
			romOffset: 0x16ea40,
			tiles: [
				[259, 277],
				[307, 309],
			],
		},
		AirshipPlatformRightShallow: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x460c,
					0x5a91,
					0x6f35,
					0x7fdb,
					0x20ba,
					0x219e,
					0x3a9f,
					0x130,
					0x1b3,
					0x1a37,
					0x2e9b,
					0x3f1e,
					0x4b9f,
				],
			],
			romOffset: 0x16ea40,
			tiles: [
				[342, 344],
				[343, 345],
			],
		},
	},

	toObjectBinary(x, y, _w, _h, settings) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;
		const cap = (settings.cap ?? this.defaultSettings!.cap) as Cap;

		const bodyId = cap.endsWith('flat') ? this.objectId : 0x33;

		const bodyBytes = [0x40, y, x, bodyId, width - 1];
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

	render(_showDetails, settings, onSettingsChange, entity) {
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
							<button
								onMouseDown={(e) => {
									e.preventDefault();
									e.stopPropagation();

									const capArray = width === 2 ? twoWideCaps : caps;

									// @ts-ignore
									const capIndex = capArray.indexOf(cap);
									const newCapIndex = (capIndex + 1) % capArray.length;
									const newCap = capArray[newCapIndex];
									onSettingsChange({
										cap: newCap,
									});
								}}
							>
								<FaHammer
									style={{ borderRadius: '10%', padding: 0.5 }}
									className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
								/>
							</button>
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

export { AirshipPlatform };