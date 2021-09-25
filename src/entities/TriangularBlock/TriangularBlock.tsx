import React from 'react';

import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { AngleEditDetails } from '../detailPanes/AngleEditDetails';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';
import { encodeObjectSets, parseObjectIdMapObject } from '../util';

const angleToObjectId: Record<number, number> = {
	0: 0x50,
	90: 0x51,
	180: 0x53,
	270: 0x52,
};

const objectIdToAngle = Object.entries(angleToObjectId).reduce<
	Record<number, number>
>((building, entry) => {
	const value = Number(entry[0]);
	const newKey = entry[1];

	building[newKey] = value;

	return building;
}, {});

const TriangularBlock: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Triangular Block',
	},

	objectId: 0x50,
	alternateObjectIds: Object.values(angleToObjectId),
	emptyBank: 0,
	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	settingsType: 'single',
	dimensions: 'none',
	defaultSettings: { angle: 0 },

	resource: {
		palettes: [
			[
				0x23df,
				0x7fff,
				0x0,
				0x4e71,
				0x5ef5,
				0x6f79,
				0x7bdd,
				0x13,
				0x19,
				0x1f,
				0x112,
				0x5a1f,
				0x6ebf,
				0x7f9f,
				0x579f,
				0x6fff,
			],
		],
		romOffset: 0x20e4f0,
		tiles: [
			[96, 97],
			[112, 113],
		],
	},

	toObjectBinary({ x, y, settings }) {
		const angle = (settings.angle ?? 0) % 360;
		return [0, y, x, angleToObjectId[angle]];
	},

	parseObject(data, offset) {
		return parseObjectIdMapObject(
			data,
			offset,
			0,
			objectIdToAngle,
			'angle',
			this
		);
	},

	simpleRender(size) {
		return (
			<div
				className="TriangularBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		return (
			<AngleEditDetails
				width={TILE_SIZE}
				height={TILE_SIZE}
				currentAngle={settings.angle as number}
				onAngleChange={(angle) => onSettingsChange({ angle })}
				disabled={!entity}
			>
				<div
					className="TriangularBlock-bg bg-cover relative cursor-pointer transform transition-all"
					style={{
						width: TILE_SIZE,
						height: TILE_SIZE,
						transform: `rotate(${settings.angle ?? 0}deg)`,
					}}
				/>
			</AngleEditDetails>
		);
	},
};

export { TriangularBlock };
