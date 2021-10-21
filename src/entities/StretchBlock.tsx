import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { parseObjectIdMapSprite } from './util';
import invert from 'lodash/invert';
import { HammerButton } from './detailPanes/HammerButton';

const orientations = ['horizontal', 'vertical', 'both'] as const;
type Orientation = typeof orientations[number];

const orientationToObjectId: Record<Orientation, number> = {
	vertical: 0xbd,
	horizontal: 0xbe,
	both: 0xbc,
};

const objectIdToOrientation = invert(orientationToObjectId) as Record<
	number,
	Orientation
>;

const StretchBlock: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Stretch Block',
	},

	objectId: 0xbe,
	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { orientation: 'horizontal' },

	resource: {
		romOffset: 0x18af80,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x3192,
				0x1636,
				0x2a9c,
				0x1f4,
				0x29a,
				0x37f,
				0x42ff,
				0x4a52,
				0x6318,
				0x77bd,
				0x7ffb,
				0x7fd2,
				0x732c,
			],
		],
		tiles: [
			[2, 3],
			[34, 35],
		],
	},

	toSpriteBinary({ x, y, settings }) {
		const orientation =
			settings.orientation ?? this.defaultSettings!.orientation;
		const objectId =
			orientationToObjectId[orientation as keyof typeof orientationToObjectId];

		return [0, objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseObjectIdMapSprite(
			data,
			offset,
			0,
			objectIdToOrientation,
			'orientation',
			this
		);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundPositionY: 'center',
			backgroundRepeat: 'repeat-x',
			backgroundSize: '20%',
		};

		return <div className="StretchBlock-bg" style={style} />;
	},

	// TODO: this is such a mess...
	render({ entity, settings, onSettingsChange }) {
		const orientation = (settings.orientation ??
			this.defaultSettings!.orientation) as Orientation;

		const singleBlockStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		switch (settings.orientation ?? 'horizontal') {
			case 'horizontal': {
				const style = {
					width: TILE_SIZE,
					height: TILE_SIZE,
					marginLeft: -2 * TILE_SIZE,
					marginRight: -2 * TILE_SIZE,
				};

				const tiles = [];
				for (let i = 0; i < 5; ++i) {
					const tileBody = (
						<div
							key={i}
							className={clsx('absolute StretchBlock-bg', {
								'opacity-25': i !== 2,
							})}
							style={{ ...singleBlockStyle, left: TILE_SIZE * i, top: 0 }}
						/>
					);
					const tile =
						!!entity && i == 2 ? (
							<div
								className="absolute z-10"
								style={{
									...singleBlockStyle,
									left: TILE_SIZE * i,
									top: 0,
								}}
							>
								<HammerButton
									values={orientations}
									currentValue={orientation}
									onNewValue={(newOrientation) => {
										onSettingsChange({ orientation: newOrientation });
									}}
								/>
								<div className="StretchBlock-bg" style={singleBlockStyle} />
							</div>
						) : (
							tileBody
						);
					tiles.push(tile);
				}

				return (
					<div className="relative" style={style}>
						{tiles}
						<div
							className="absolute"
							style={{ ...singleBlockStyle, left: TILE_SIZE * 2, top: 0 }}
						>
							<TileSpace />
						</div>
					</div>
				);
			}
			case 'vertical': {
				const style = {
					width: TILE_SIZE,
					height: TILE_SIZE,
					marginTop: -2 * TILE_SIZE,
					marginBottom: -2 * TILE_SIZE,
				};

				const tiles = [];
				for (let i = 0; i < 5; ++i) {
					const tileBody = (
						<div
							key={i}
							className={clsx('absolute StretchBlock-bg', {
								'opacity-25': i !== 2,
							})}
							style={{ ...singleBlockStyle, top: TILE_SIZE * i, left: 0 }}
						/>
					);
					const tile =
						!!entity && i == 2 ? (
							<div
								className="absolute z-10"
								style={{
									...singleBlockStyle,
									top: TILE_SIZE * i,
									left: 0,
								}}
							>
								<HammerButton
									values={orientations}
									currentValue={orientation}
									onNewValue={(newOrientation) => {
										onSettingsChange({ orientation: newOrientation });
									}}
								/>
								<div className="StretchBlock-bg" style={singleBlockStyle} />
							</div>
						) : (
							tileBody
						);
					tiles.push(tile);
				}

				return (
					<div className="relative" style={style}>
						{tiles}
						<div
							className="absolute"
							style={{ ...singleBlockStyle, top: TILE_SIZE * 2, left: 0 }}
						>
							<TileSpace />
						</div>
					</div>
				);
			}
			case 'both': {
				const style = {
					width: TILE_SIZE,
					height: TILE_SIZE,
					marginTop: -2 * TILE_SIZE,
					marginBottom: -2 * TILE_SIZE,
					marginLeft: -2 * TILE_SIZE,
					marginRight: -2 * TILE_SIZE,
				};

				const tiles = [];
				for (let i = 0; i < 5; ++i) {
					const tileBody = (
						<div
							key={i}
							className={clsx('absolute StretchBlock-bg', {
								'opacity-25': i !== 2,
							})}
							style={{
								...singleBlockStyle,
								top: TILE_SIZE * i,
								left: TILE_SIZE * 2,
							}}
						/>
					);
					const tile =
						!!entity && i == 2 ? (
							<div
								className="absolute z-10"
								style={{
									...singleBlockStyle,
									top: TILE_SIZE * i,
									left: TILE_SIZE * 2,
								}}
							>
								<HammerButton
									values={orientations}
									currentValue={orientation}
									onNewValue={(newOrientation) => {
										onSettingsChange({ orientation: newOrientation });
									}}
								/>
								<div className="StretchBlock-bg" style={singleBlockStyle} />
							</div>
						) : (
							tileBody
						);
					tiles.push(tile);

					if (i !== 2) {
						tiles.push(
							<div
								key={`both-opposite-${i}`}
								className={clsx('absolute StretchBlock-bg', {
									'opacity-25': i !== 2,
								})}
								style={{
									...singleBlockStyle,
									top: TILE_SIZE * 2,
									left: TILE_SIZE * i,
								}}
							/>
						);
					}
				}

				return (
					<div className="relative" style={style}>
						{tiles}
						<div
							className="absolute"
							style={{
								...singleBlockStyle,
								top: TILE_SIZE * 2,
								left: TILE_SIZE * 2,
							}}
						>
							<TileSpace />
						</div>
					</div>
				);
			}
		}

		return null;
	},
};

export { StretchBlock };
