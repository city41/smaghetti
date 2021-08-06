import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';
import clamp from 'lodash/clamp';
import { TileSpace } from './TileSpace';

type Settings = {
	pulleyDistance: number;
	leftHeight: number;
	rightHeight: number;
};

const PlatformPullied: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Platform - Pullied',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xdf,
	rotationGraphicSet: 1,
	settingsType: 'single',
	defaultSettings: { pulleyDistance: 4, leftHeight: 0x38, rightHeight: 0x60 },

	resources: {
		PlatformPulley: {
			romOffset: 0x18af80,
			palettes: [
				[
					0x7f96,
					0x0,
					0x7fff,
					0x196,
					0x123b,
					0x1a9e,
					0x25fd,
					0x369e,
					0x475f,
					0x0,
					0x7f11,
					0x7f74,
					0x7fd8,
					0x31f,
					0x21f,
					0x1d,
				],
			],
			tiles: [[273]],
		},
		PlatformPulleyRopeHorizontal: {
			romOffset: 0x18af80,
			palettes: [
				[
					0x7f96,
					0x0,
					0x7fff,
					0x196,
					0x123b,
					0x1a9e,
					0x25fd,
					0x369e,
					0x475f,
					0x0,
					0x7f11,
					0x7f74,
					0x7fd8,
					0x31f,
					0x21f,
					0x1d,
				],
			],
			tiles: [[274]],
		},
		PlatformPulleyRopeVertical: {
			romOffset: 0x18af80,
			palettes: [
				[
					0x7f96,
					0x0,
					0x7fff,
					0x196,
					0x123b,
					0x1a9e,
					0x25fd,
					0x369e,
					0x475f,
					0x0,
					0x7f11,
					0x7f74,
					0x7fd8,
					0x31f,
					0x21f,
					0x1d,
				],
			],
			tiles: [[272]],
		},
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		const { pulleyDistance, leftHeight, rightHeight } = {
			...this.defaultSettings!,
			...settings,
		} as Settings;

		return [0, this.objectId, x, y, leftHeight - 8].concat([
			0,
			this.objectId,
			x + pulleyDistance,
			y,
			rightHeight - 8,
		]);
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const pulleyStyle = { width: size / 4, height: size / 4 };
		const platformStyle = {
			width: size,
			height: size / 4,
		};
		return (
			<div style={style} className="flex flex-col justify-center items-center">
				<div className="PlatformPulley-bg bg-cover" style={pulleyStyle} />
				<div
					className="PlatformPulleyRopeVertical-bg bg-cover"
					style={pulleyStyle}
				/>
				<div
					className="PlatformPulleyRopeVertical-bg bg-cover"
					style={pulleyStyle}
				/>
				<div className="FallAwayPlatform-bg bg-cover" style={platformStyle} />
			</div>
		);
	},

	render(_showDetails, settings, onSettingsChange, entity) {
		const { pulleyDistance, leftHeight, rightHeight } = {
			...this.defaultSettings!,
			...settings,
		} as Settings;

		const pulleyStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE / 2,
		};

		const topRopeStyle = {
			height: TILE_SIZE / 2,
			width: (pulleyDistance - 0.5) * TILE_SIZE,
			top: 0,
			left: TILE_SIZE / 2,
		};

		const rightPulleyStyle = {
			...pulleyStyle,
			top: 0,
			left: pulleyDistance * TILE_SIZE,
		};

		const leftPulley = (
			<div style={pulleyStyle} className="PlatformPulley-bg bg-cover" />
		);

		const topRope = (
			<div
				style={topRopeStyle}
				className="absolute PlatformPulleyRopeHorizontal-bg bg-repeat-x"
			/>
		);

		const rightPulley = (
			<div style={rightPulleyStyle} className="absolute">
				<div
					style={{ transform: 'scale(-1, 1)' }}
					className="absolute top-0 left-0 w-full h-full PlatformPulley-bg bg-cover"
				/>
				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={{ x: pulleyDistance, y: 1 }}
						increment={TILE_SIZE}
						axis="x"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ pulleyDistance: clamp(newSizePoint.x, 1, 7) });
						}}
					/>
				)}
			</div>
		);

		const leftPlatformStyle = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE / 2,
			left: -TILE_SIZE,
			top: leftHeight,
		};

		const leftPlatform = (
			<div
				className="absolute FallAwayPlatform-bg bg-no-repeat flex flex-row items-end justify-between"
				style={leftPlatformStyle}
			>
				{!!entity && (
					<Resizer
						className="absolute bottom-0 left-0"
						style={{ marginLeft: '-0.12rem', marginBottom: '-0.12rem' }}
						size={{ x: 1, y: leftHeight }}
						increment={1}
						axis="y"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({
								leftHeight: clamp(newSizePoint.y, 0x8, 0xf0),
							});
						}}
					/>
				)}
			</div>
		);

		const rightPlatformStyle = {
			...leftPlatformStyle,
			left: (pulleyDistance - 0.5) * TILE_SIZE,
			top: rightHeight,
		};

		const rightPlatform = (
			<div
				className="absolute FallAwayPlatform-bg bg-no-repeat flex flex-row items-end justify-between"
				style={rightPlatformStyle}
			>
				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={{ x: 1, y: rightHeight }}
						increment={1}
						axis="y"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({
								rightHeight: clamp(newSizePoint.y, 0x8, 0xf0),
							});
						}}
					/>
				)}
			</div>
		);

		const leftRopeStyle = {
			width: TILE_SIZE / 2,
			height: leftHeight - 8,
			top: TILE_SIZE / 2,
			left: 0,
		};

		const leftRope = (
			<div
				style={leftRopeStyle}
				className="absolute PlatformPulleyRopeVertical-bg bg-repeat-y"
			/>
		);

		const rightRopeStyle = {
			...leftRopeStyle,
			height: rightHeight - 8,
			top: TILE_SIZE / 2,
			left: (pulleyDistance + 0.5) * TILE_SIZE - 2,
		};

		const rightRope = (
			<div
				style={rightRopeStyle}
				className="absolute PlatformPulleyRopeVertical-bg bg-repeat-y"
			/>
		);

		return (
			<div className="relative">
				<TileSpace
					style={{ width: TILE_SIZE, height: TILE_SIZE }}
					className="absolute top-0 left-0"
				/>
				{leftPulley}
				{topRope}
				{rightPulley}
				{leftRope}
				{rightRope}
				{leftPlatform}
				{rightPlatform}
			</div>
		);
	},
};

export { PlatformPullied };
