import React from 'react';
import { GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';

import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { TileSpace } from '../TileSpace';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { FireBarDetails, paramTree } from './FireBarDetails';
import type {
	Rotation,
	Pivot,
	FireballCount,
	FireBarSettings,
} from './FireBarDetails';

const FireBar: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Fire Bar',
		description: 'round and round we go',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { rotation: 'counter-clockwise', pivot: 'end', count: 4 },
	objectId: 0xb9,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x101a,
			0x10bf,
			0x125f,
			0x25fd,
			0x369e,
			0x475f,
			0x139f,
			0x177,
			0x21c,
			0x29f,
			0x47bf,
			0x137f,
			0x25f,
		],
		romOffset: 0x163768,
		tiles: [[290], [306]],
	},

	toSpriteBinary(x, y, _w, _h, settings): number[] {
		// todo: 3 means 4 fireballs counterclockwise, need a details pane to let user choose
		const rotation = settings.rotation ?? this.defaultSettings!.rotation;
		const pivot = settings.pivot ?? this.defaultSettings!.pivot;
		const count = settings.count ?? this.defaultSettings!.count;

		const param =
			paramTree[rotation as Rotation][pivot as Pivot][count as FireballCount];

		return [0, this.objectId, x, y, param ?? 0];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '100%',
		};

		return <div className="FireBar-bg bg-center bg-no-repeat" style={style} />;
	},

	render(showDetails, settings, onSettingsChange) {
		const FIREBALL_SIZE = TILE_SIZE - 5;

		const actualSettings = {
			...this.defaultSettings!,
			...settings,
		} as FireBarSettings;

		const style = {
			width: FIREBALL_SIZE - 2.5,
			height: FIREBALL_SIZE - 2.5,
			top: 4,
		};

		const fireballs = [];

		const RotationIcon =
			actualSettings.rotation === 'clockwise'
				? GiClockwiseRotation
				: GiAnticlockwiseRotation;

		const shiftOffset =
			actualSettings.pivot === 'end'
				? 0
				: (FIREBALL_SIZE * actualSettings.count) / 2 - 5;

		for (let i = 0; i < actualSettings.count; ++i) {
			fireballs.push(
				<div
					className="FireBar-bg absolute bg-center bg-no-repeat"
					style={{ ...style, left: -i * FIREBALL_SIZE + 3 + shiftOffset }}
				/>
			);
		}

		const body = (
			<div className="relative" style={{ width: TILE_SIZE, height: TILE_SIZE }}>
				{fireballs}
				<TileSpace />
				<RotationIcon
					className="absolute w-1 h-1 bg-black text-white"
					style={{ left: 1, bottom: 1, padding: 0.25 }}
				/>
			</div>
		);

		if (showDetails) {
			return (
				<FireBarDetails
					settings={actualSettings as FireBarSettings}
					onSettingsChange={onSettingsChange}
				>
					{body}
				</FireBarDetails>
			);
		} else {
			return body;
		}
	},
};

export { FireBar };
