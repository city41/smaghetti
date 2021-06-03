import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { TileSpace } from '../TileSpace';
import React from 'react';
import {
	CardinalDirection,
	CardinalDirectionEditDetails,
} from '../detailPanes/CardinalDirectionEditDetails';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';
import { encodeObjectSets } from '../util';

const directionToObjectId = {
	left: 0x4c,
	right: 0x4b,
};

const ArrowSign: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Arrow Sign',
	},

	objectId: 0x4b,
	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	dimensions: 'none',
	defaultSettings: { direction: 'right' },
	width: 2,
	height: 2,

	resource: {
		romOffset: 0x20e4f0,
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
		tiles: [
			// TODO: 74 is a blank tile, need to support null tiles here
			[74, 74, 74],
			[41, 42, 43],
			[57, 58, 59],
			[74, 31, 74],
		],
	},

	toObjectBinary(x, y, _w, _h, settings): number[] {
		const direction = settings?.direction ?? this.defaultSettings!.direction;

		return [
			0,
			y,
			x,
			directionToObjectId[direction as keyof typeof directionToObjectId],
		];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '66% 100%',
		};

		return (
			<div className="ArrowSign-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const baseStyle = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
			backgroundSize: '75%',
		};
		const transformStyle =
			settings.direction === 'left' ? { transform: 'scale(-1, 1)' } : {};

		const body = (
			<div
				className="ArrowSign-bg bg-cover bg-no-repeat relative cursor-pointer"
				style={{ ...transformStyle, ...baseStyle }}
			>
				<TileSpace />
			</div>
		);

		if (showDetails) {
			const directions = Object.keys(
				directionToObjectId
			) as CardinalDirection[];

			return (
				<CardinalDirectionEditDetails
					directions={directions}
					width={TILE_SIZE * 2}
					height={TILE_SIZE * 2}
					onDirectionChange={(direction) => onSettingsChange({ direction })}
				>
					{body}
				</CardinalDirectionEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { ArrowSign, directionToObjectId };
