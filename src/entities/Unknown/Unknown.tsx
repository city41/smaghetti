import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { UnknownDetails } from './UnknownDetails';

const Unknown: Entity = {
	paletteCategory: 'meta',
	paletteInfo: {
		title: 'Unknown',
		description:
			'When parsing a binary level, if it encounters an unknown entity, this placeholder is added to the level to represent it.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0,

	toSpriteBinary({ settings }) {
		if (settings.type === 'object') {
			return [];
		}

		return settings.rawBytes as number[];
	},

	toObjectBinary({ settings }) {
		if (settings.type === 'sprite') {
			return [];
		}

		return settings.rawBytes as number[];
	},

	simpleRender(size) {
		return (
			<div
				className="bg-gray-600 text-white text-xl grid place-items-center border-2 border-dashed border-white"
				style={{ width: size, height: size }}
			>
				?
			</div>
		);
	},

	render({ settings, showDetails }) {
		const body = (
			<div
				className="bg-gray-600 text-white flex flex-col items-center border border-dashed border-white"
				style={{ width: TILE_SIZE, height: TILE_SIZE, fontSize: 4 }}
			>
				<div>{settings.type}</div>
				<div>{settings.objectId.toString(16)}</div>
			</div>
		);

		if (showDetails) {
			return (
				<UnknownDetails rawBytes={settings.rawBytes as number[]}>
					{body}
				</UnknownDetails>
			);
		} else {
			return body;
		}
	},

	getProblem({ settings }) {
		return `Unknown ${settings?.type}, ${settings?.objectId.toString(16)}`;
	},
};

export { Unknown };
