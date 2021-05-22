import React from 'react';
import clsx from 'clsx';

import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { AngleEditDetails } from '../../components/details/AngleEditDetails';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';
import { encodeObjectSets } from '../util';

const angleToObjectId: Record<number, number> = {
	0: 0x50,
	90: 0x51,
	180: 0x53,
	270: 0x52,
};

const TriangularBlock: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Triangular Block',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	settingsType: 'single',
	dimensions: 'none',
	defaultSettings: { angle: 0 },

	resource: {
		palette: [
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
		romOffset: 0x20e4f0,
		tiles: [
			[96, 97],
			[112, 113],
		],
	},

	toObjectBinary(x, y, _w, _h, settings) {
		return [0, y, x, angleToObjectId[(settings.angle ?? 0) as number]];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="TriangularBlock-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const body = (
			<div
				className={clsx(
					'TriangularBlock-bg bg-cover relative cursor-pointer transform',
					{
						'rotate-90': settings.angle === 90,
						'rotate-180': settings.angle === 180,
						'-rotate-90': settings.angle === 270,
					}
				)}
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
			/>
		);

		if (showDetails) {
			return (
				<AngleEditDetails
					width={TILE_SIZE}
					height={TILE_SIZE}
					currentAngle={settings.angle as number}
					onAngleChange={(angle) => onSettingsChange({ angle })}
				>
					{body}
				</AngleEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { TriangularBlock };
