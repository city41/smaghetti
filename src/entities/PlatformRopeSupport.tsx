import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets } from './util';
import { HammerButton } from './detailPanes/HammerButton';

const sides = ['right', 'left'] as const;
type Side = typeof sides[number];

const sideToObjectId: Record<Side, number> = {
	right: 2,
	left: 3,
};

const PlatformRopeSupport: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Platform Rope Support',
		description: 'Holds platforms up for that added "actors on a stage" vibe',
	},

	objectSets: encodeObjectSets([
		[12, 4],
		[4, 4],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x2,
	alternateObjectIds: Object.values(sideToObjectId),
	emptyBank: 0,
	settingsType: 'single',
	defaultSettings: { side: 'right' },

	resources: {
		PlatformRopeSupportAttach: {
			palettes: [
				[
					31744,
					0,
					32767,
					24035,
					31400,
					5278,
					607,
					9055,
					8973,
					0,
					0,
					0,
					25535,
					0,
					0,
					0,
				],
				[
					31744,
					32767,
					0,
					26019,
					31371,
					32622,
					32726,
					5524,
					11833,
					17085,
					13928,
					18121,
					24364,
					28592,
					32534,
					32697,
				],
			],
			tiles: [
				[
					{
						romOffset: 1455976,
						tileIndex: 798,
						palette: 1,
					},
				],
				[
					{
						romOffset: 1455976,
						tileIndex: 799,
						palette: 1,
					},
				],
			],
			romOffset: 1253344,
		},
		PlatformRopeSupportRope: {
			palettes: [
				[
					31744,
					0,
					32767,
					24035,
					31400,
					5278,
					607,
					9055,
					8973,
					0,
					0,
					0,
					25535,
					0,
					0,
					0,
				],
				[
					31744,
					32767,
					0,
					26019,
					31371,
					32622,
					32726,
					5524,
					11833,
					17085,
					13928,
					18121,
					24364,
					28592,
					32534,
					32697,
				],
			],
			tiles: [
				[
					{
						romOffset: 1455976,
						tileIndex: 798,
						palette: 1,
					},
				],
			],
			romOffset: 1253344,
		},
	},

	toObjectBinary({ x, y, settings }) {
		const side = (settings.side ?? this.defaultSettings!.side) as Side;
		const objectId = sideToObjectId[side];

		return [0, y, x, objectId];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 100%',
		};

		return (
			<div
				className="PlatformRopeSupportAttach-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render({ entity, settings, onSettingsChange }) {
		const side = (settings.side ?? this.defaultSettings!.side) as Side;
		const height = (entity?.y ?? 0) / TILE_SIZE + 1;

		const transformStyle =
			side === 'right'
				? {
						transform: 'scale(-1, 1)',
				  }
				: {};

		const attachStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundSize: '50% 100%',
			...transformStyle,
		};

		const ropeStyle = {
			height: (height - 1) * TILE_SIZE,
			width: TILE_SIZE,
			backgroundSize: '50% 100%',
		};

		const ropePositionStyle = {
			left: 0,
			top: -((height - 1) * TILE_SIZE),
			height: (height - 1) * TILE_SIZE,
		};

		return (
			<div
				style={attachStyle}
				className="relative PlatformRopeSupportAttach-bg bg-no-repeat"
			>
				{!!entity && (
					<HammerButton
						style={transformStyle}
						currentValue={side}
						values={sides}
						onNewValue={(newSide) => {
							onSettingsChange({ side: newSide });
						}}
					/>
				)}
				<div style={ropePositionStyle} className="absolute flex flex-col">
					<div
						style={ropeStyle}
						className="PlatformRopeSupportRope-bg bg-repeat-y"
					/>
				</div>
			</div>
		);
	},
};

export { PlatformRopeSupport };
