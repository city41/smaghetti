import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { getBankParam1, parseParam1WidthEntityObject } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';
import { TileSpace } from './TileSpace';
import clamp from 'lodash/clamp';

import styles from '../components/Resizer/ResizingStyles.module.css';

function getTileSize(len: number): Point {
	const riserCount = Math.ceil(len / 2);

	let height = 0;

	switch (len) {
		case 1:
		case 2:
			height = len;
			break;
		default:
			height = 2 + Math.floor((len - 2) / 2);
	}

	return {
		x: riserCount,
		y: height,
	};
}

const WoodRampUpRight: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Wood Ramp - Up Right',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { length: 3 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x79,
	emptyBank: 1,
	width: 1,
	height: 1,

	resources: {
		WoodRampUpRightBottom: {
			palettes: [
				[
					0x7ffb,
					0x7fff,
					0x0,
					0x575d,
					0x169a,
					0x1237,
					0xdd3,
					0x36b8,
					0x2633,
					0x15b0,
					0x12c,
					0x12c,
					0x3ebf,
					0x2e3d,
					0x19d9,
					0x155,
				],
			],
			romOffset: 0x1cf558,
			tiles: [
				[10, 12],
				[26, 0],
			],
		},
		WoodRampUpRightTop: {
			palettes: [
				[
					0x7ffb,
					0x7fff,
					0x0,
					0x575d,
					0x169a,
					0x1237,
					0xdd3,
					0x36b8,
					0x2633,
					0x15b0,
					0x12c,
					0x12c,
					0x3ebf,
					0x2e3d,
					0x19d9,
					0x155,
				],
			],
			romOffset: 0x1cf558,
			tiles: [
				[0, 11],
				[25, 27],
			],
		},
	},

	toObjectBinary({ x, y, settings }) {
		const length = settings.length ?? 1;

		return [getBankParam1(1, length - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseParam1WidthEntityObject(data, offset, this, 'length');
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
				<div />
				<div style={cellStyle} className="WoodRampUpRightTop-bg bg-cover" />
				<div style={cellStyle} className="WoodRampUpRightTop-bg bg-cover" />
				<div style={cellStyle} className="WoodRampUpRightBottom-bg bg-cover" />
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

		const cells = [];

		let curX = 0;
		let curY = 0;
		for (let l = 0; l < length; ++l) {
			if (l % 2 === 1) {
				cells.push(
					<div
						key={l}
						style={{
							...baseCellStyle,
							left: curX * TILE_SIZE,
							top: curY * TILE_SIZE,
						}}
						className="absolute WoodRampUpRightTop-bg bg-cover"
					/>
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
						className="absolute WoodRampUpRightBottom-bg bg-cover"
					/>
				);
				curY -= 1;
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
							className="absolute right-0"
							style={{
								top: -(tileHeight - 1) * TILE_SIZE,
								left: tileWidth * TILE_SIZE,
								marginLeft: '-0.12rem',
								marginBottom: '-0.12rem',
							}}
							size={{ x: tileWidth, y: tileHeight }}
							increment={TILE_SIZE}
							axis="xy"
							onSizeChange={(newSizePoint) => {
								let newLength;

								if (newSizePoint.x > tileWidth || newSizePoint.y < tileHeight) {
									newLength = clamp(length + 1, 1, 64);
								} else {
									newLength = clamp(length - 1, 1, 64);
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

export { WoodRampUpRight };
