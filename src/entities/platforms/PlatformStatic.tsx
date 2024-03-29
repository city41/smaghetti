import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';

import { PlatformWidthButton } from './PlatformWidthButton';
import { Width } from './common';

const PlatformStatic: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Platform - Basic',
		description: 'Just stays where you put it',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0x1,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	defaultSettings: { width: 3 },

	toSpriteBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as Width;

		const widthByte = width === 3 ? 0 : 0x80;

		return [1, this.objectId, x, y, widthByte, 0];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 25%' };
		return (
			<div
				className="FallAwayPlatform-bg bg-center bg-no-repeat flex flex-col items-center justify-between"
				style={style}
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const width = (settings.width ?? this.defaultSettings!.width) as Width;

		const pieceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE / 2,
		};

		const bodyPieces = [];

		for (let i = 0; i < width - 2; i += 1) {
			bodyPieces.push(
				<div
					key={i}
					className="FloatingPlatformCenter-bg bg-cover"
					style={pieceStyle}
				/>
			);
		}
		const platform = (
			<>
				<div className="flex flex-row">
					<div
						className="FloatingPlatformLeftEnd-bg bg-cover"
						style={pieceStyle}
					/>
					{bodyPieces}
					<div
						className="FloatingPlatformRightEnd-bg bg-cover"
						style={pieceStyle}
					/>
				</div>
			</>
		);

		const style = { width: TILE_SIZE * width, height: TILE_SIZE / 2 };
		return (
			<div className="relative" style={style}>
				<div className="top-0 left-0 w-full z-10">{platform}</div>
				<></>
				{!!entity && (
					<div
						style={{ top: TILE_SIZE * 0.5 + 1, width: TILE_SIZE }}
						className="absolute left-0 flex flex-row justify-around align-start z-10"
					>
						<PlatformWidthButton
							widths={[3, 4]}
							currentWidth={width}
							onWidthChange={(newWidth) => {
								onSettingsChange({ width: newWidth });
							}}
						/>
					</div>
				)}
			</div>
		);
	},
};

export { PlatformStatic };
