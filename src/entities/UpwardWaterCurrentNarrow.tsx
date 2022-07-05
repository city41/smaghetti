import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';
import { parseSimpleSprite } from './util';
import { HammerButton } from './detailPanes/HammerButton';

const orientations = ['up', 'down'] as const;
type Orientation = typeof orientations[number];

const orientationToObjectId: Record<Orientation, number> = {
	up: 0x65,
	down: 0x66,
};

const dotPositions: Point[] = [
	{ x: 2, y: 59 },
	{ x: 0, y: 87 },
	{ x: 17, y: 78 },
	{ x: 24, y: 84 },
	{ x: 30, y: 89 },
	{ x: 31, y: 80 },
	{ x: 40, y: 82 },
	{ x: 45, y: 60 },
	{ x: 45, y: 86 },
	{ x: 1, y: 20 },
	{ x: 44, y: 35 },
];

const UpwardWaterCurrentNarrow: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Water Current - Narrow',
		description:
			'Usually placed at the mouth of an underwater pipe to cause a water flow',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x65,
	alternateObjectIds: Object.values(orientationToObjectId),
	defaultSettings: {
		orientation: 'up',
	},

	toSpriteBinary({ x, y, settings }) {
		const orientation = (settings.orientation ??
			this.defaultSettings!.orientation) as Orientation;

		const objectId = orientationToObjectId[orientation];
		return [0, objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};

		const dotStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE / 2,
		};

		const scale = size / (TILE_SIZE * 7);

		return (
			<div
				className="relative bg-blue-700 rounded-lg overflow-hidden"
				style={style}
			>
				{dotPositions.map((p, i) => (
					<div
						key={i}
						className="absolute bg-cover Tornado-bg"
						style={{
							...dotStyle,
							top: p.y * scale,
							left: size / 4 + p.x * scale,
						}}
					/>
				))}
			</div>
		);
	},

	render({ entity, settings, onSettingsChange }) {
		const orientation = (settings.orientation ??
			this.defaultSettings!.orientation) as Orientation;

		const style = {
			width: 2 * TILE_SIZE,
			height: 3 * TILE_SIZE,
		};

		const dotStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE / 2,
		};

		const tileSpaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const translation = orientation === 'up' ? 0 : TILE_SIZE;
		const multiplier = orientation === 'up' ? 1 : -1;

		return (
			<div style={style} className="relative">
				{dotPositions.map((p, i) => (
					<div
						key={i}
						className="absolute bg-cover Tornado-bg"
						style={{
							...dotStyle,
							top:
								-(style.height - (p.y / 100) * style.height - TILE_SIZE) *
									multiplier +
								translation,
							left: (p.x / 50) * style.width,
						}}
					/>
				))}
				<div className="absolute top-0 left-0" style={tileSpaceStyle}>
					<TileSpace />
					{!!entity && (
						<HammerButton
							values={orientations}
							currentValue={orientation}
							onNewValue={(newOrientation) => {
								onSettingsChange({
									orientation: newOrientation,
								});
							}}
						/>
					)}
				</div>
			</div>
		);
	},
};

export { UpwardWaterCurrentNarrow };
