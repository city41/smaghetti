import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parsePixelPositionedSprite } from './util';
import { Resizer } from '../components/Resizer';
import clamp from 'lodash/clamp';
import clsx from 'clsx';
import { TileSpace } from './TileSpace';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const GoombaPixelPositioned: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Goomba - Pixel Positioned',
		description:
			'Just like normal Goomba, but takes a pixel offset that changes its starting position',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x1d,
	defaultSettings: {
		pixelOffset: 0,
	},

	toSpriteBinary({ x, y, settings }) {
		const pixelOffset = (settings.pixelOffset ??
			this.defaultSettings!.pixelOffset) as number;

		// fifth byte
		// 0 = goomba
		// 1 = buzzy beetle
		// 2 = green koopa
		// 3 = red koopa
		// and there are probably more
		// https://github.com/city41/smaghetti/wiki/Pixel-positioned-sprites

		let pixelOffsetByte = pixelOffset;

		if (pixelOffset < 0) {
			pixelOffsetByte = 255 + pixelOffset;
		}

		return [1, this.objectId, x, y, 0, pixelOffsetByte];
	},

	parseSprite(data, offset) {
		return parsePixelPositionedSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="relative border-b-4 border-blue-600"
				style={{
					width: size,
					height: size,
				}}
			>
				<div className="absolute Goomba-bg bg-cover w-full h-full -right-4" />
			</div>
		);
	},

	render({ settings, entity, onSettingsChange }) {
		const pixelOffset = (settings.pixelOffset ??
			this.defaultSettings!.pixelOffset) as number;

		const width = TILE_SIZE + Math.abs(pixelOffset);

		const style = {
			width,
			height: TILE_SIZE,
			...(pixelOffset < 0
				? { paddingRight: Math.abs(pixelOffset), marginLeft: pixelOffset }
				: { paddingLeft: Math.abs(pixelOffset) }),
		};

		return (
			<div className="relative" style={{ width: TILE_SIZE, height: TILE_SIZE }}>
				<TileSpace
					className="absolute"
					style={{ width: TILE_SIZE, height: TILE_SIZE }}
				/>
				<div
					style={style}
					className={clsx('absolute border-b', {
						'border-blue-600': pixelOffset >= 0,
						'border-yellow-600': pixelOffset < 0,
					})}
				>
					<div
						className="Goomba-bg bg-cover"
						style={{ width: TILE_SIZE, height: TILE_SIZE }}
					/>
					{!!entity && (
						<Resizer
							className="absolute bottom-0"
							style={{
								marginBottom: '-0.12rem',
								...(pixelOffset < 0
									? { left: `calc(${TILE_SIZE}px - 0.12rem)` }
									: { right: '-0.12rem' }),
							}}
							size={{ x: pixelOffset, y: 1 }}
							increment={1}
							axis="x"
							onSizeChange={(newSizePoint) => {
								const newPixelOffset = clamp(newSizePoint.x, -127, 127);
								onSettingsChange({
									pixelOffset: newPixelOffset,
								});
							}}
							onResizeStart={() => onSettingsChange({ resizing: true })}
							onResizeEnd={() => onSettingsChange({ resizing: false })}
						/>
					)}
				</div>
			</div>
		);
	},
};

export { GoombaPixelPositioned };
