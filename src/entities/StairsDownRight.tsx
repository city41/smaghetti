import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';
import { TileSpace } from './TileSpace';

function getTileSize(len: number): Point {
	const riserCount = len & 1 ? Math.ceil(len / 2) : len / 2 + 1;
	return {
		x: riserCount,
		y: Math.round(riserCount * 0.75),
	};
}

const StairsDownRight: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Stairs - Down Right',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { length: 3 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x6c,
	emptyBank: 1,
	width: 1,
	height: 1,

	resources: {
		StairsDownRightBack: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x15d2,
					0x2257,
					0x2afc,
					0x37be,
					0x20ba,
					0x21be,
					0x32df,
					0x3192,
					0x1636,
					0x2a9c,
					0x42ff,
				],
			],
			romOffset: 0x1cf558,
			tiles: [[{ tileIndex: 2, flip: 'h' }]],
		},
		StairsDownRightTread: {
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x15d2,
					0x2257,
					0x2afc,
					0x37be,
					0x20ba,
					0x21be,
					0x32df,
					0x3192,
					0x1636,
					0x2a9c,
					0x42ff,
				],
			],
			romOffset: 0x1cf558,
			tiles: [[{ tileIndex: 1, flip: 'h' }]],
		},
	},

	toObjectBinary({ x, y, settings }) {
		const length = settings.length ?? 1;

		return [getBankParam1(1, length - 1), y, x, this.objectId];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};

		const cellStyle = {
			width: size / 2,
			height: size / 2,
		};

		return (
			<div className="grid grid-cols-2 grid-rows-2" style={style}>
				<div style={cellStyle} className="StairsDownRightBack-bg bg-cover" />
				<div style={cellStyle} className="StairsDownRightTread-bg bg-cover" />
				<div />
				<div style={cellStyle} className="StairsDownRightBack-bg bg-cover" />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const length = settings.length ?? this.defaultSettings!.length;

		const { x: tileWidth, y: tileHeight } = getTileSize(length);

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const baseCellStyle = { width: TILE_SIZE, height: TILE_SIZE };
		const quarterCellStyle = { width: TILE_SIZE / 2, height: TILE_SIZE / 2 };

		const cells = [];

		let curX = 0;
		let curY = 0;
		for (let l = 0; l < length; ++l) {
			if (l % 2 === 0) {
				cells.push(
					<div
						key={l}
						style={{
							...baseCellStyle,
							left: curX * TILE_SIZE,
							top: curY * TILE_SIZE,
						}}
						className="absolute grid grid-cols-2 grid-rows-2"
					>
						<div />
						<div
							style={quarterCellStyle}
							className="StairsDownRightBack-bg bg-cover"
						/>
					</div>
				);
				curX += 1;
			} else {
				cells.push(
					<div
						key={l}
						style={{
							...baseCellStyle,
							left: curX * TILE_SIZE,
							top: curY * TILE_SIZE,
						}}
						className="absolute grid grid-cols-2 grid-rows-2"
					>
						<div
							style={quarterCellStyle}
							className="StairsDownRightTread-bg bg-cover"
						/>
						<div />
						<div
							style={quarterCellStyle}
							className="StairsDownRightBack-bg bg-cover"
						/>
						<div
							style={quarterCellStyle}
							className="StairsDownRightTread-bg bg-cover"
						/>
					</div>
				);
				curY += 1;
			}
		}

		return (
			<div
				className={clsx('relative', {
					[styles.resizing]: settings?.resizing,
				})}
				style={style}
			>
				{cells}
				{!!entity && (
					<>
						<TileSpace
							className="absolute top-0 left-0"
							style={{ width: TILE_SIZE, height: TILE_SIZE }}
						/>
						<Resizer
							className="absolute bottom-0 right-0"
							style={{
								top: tileHeight * TILE_SIZE,
								left: tileWidth * TILE_SIZE,
								marginLeft: '-0.12rem',
								marginBottom: '-0.12rem',
							}}
							size={{ x: tileWidth, y: tileHeight }}
							increment={TILE_SIZE}
							axis="xy"
							onSizeChange={(newSizePoint) => {
								let newLength;

								if (newSizePoint.x > tileWidth || newSizePoint.y > tileHeight) {
									newLength = length + 1;
								} else {
									newLength = Math.max(1, length - 1);
								}

								onSettingsChange({
									length: newLength,
								});
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

export { StairsDownRight };
