import React from 'react';
import clsx from 'clsx';
import type { Entity, SpriteGraphicSets } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parsePixelPositionedSprite } from './util';
import { Resizer } from '../components/Resizer';
import clamp from 'lodash/clamp';
import { TileSpace } from './TileSpace';

function getPixelPositionedEntity(
	name: string,
	spriteClassName: string,
	spriteId: number,
	spriteGraphicSets: SpriteGraphicSets,
	height = TILE_SIZE
) {
	const pixelPositionedEntity: Entity = {
		paletteCategory: 'enemy',
		paletteInfo: {
			subCategory: 'enemy-pixel-positioned',
			title: `${name} - Pixel Positioned`,
			description: `Just like normal ${name}, but takes a pixel offset that changes its starting position`,
		},

		objectSets: ANY_OBJECT_SET,
		spriteGraphicSets,
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
			// 4 = spiny
			// https://github.com/city41/smaghetti/wiki/Pixel-positioned-sprites

			let pixelOffsetByte = pixelOffset;

			// convert negative value into a 2's compliment signed byte
			if (pixelOffset < 0) {
				pixelOffsetByte = 256 + pixelOffset;
			}

			return [1, this.objectId, x, y, spriteId, pixelOffsetByte];
		},

		parseSprite(data, offset) {
			return parsePixelPositionedSprite(data, offset, spriteId, this);
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
					<div
						className={clsx(
							spriteClassName,
							'absolute bg-cover bg-no-repeat bg-center w-full h-full -right-4'
						)}
						style={{ backgroundSize: `${(TILE_SIZE / height) * 100}% 100%` }}
					/>
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
				<div
					className="relative"
					style={{ width: TILE_SIZE, height: TILE_SIZE }}
				>
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
							className={clsx('bg-cover', spriteClassName)}
							style={{
								width: TILE_SIZE,
								height,
								marginTop: TILE_SIZE - height,
							}}
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

	return pixelPositionedEntity;
}

export { getPixelPositionedEntity };
