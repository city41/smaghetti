import type { Entity } from './types';
import { getBankParam1 } from './util';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import clsx from 'clsx';

function isLavaAbove(
	entity: EditorEntity | undefined,
	matrix: EditorEntityMatrix | undefined
): boolean {
	if (!entity || !matrix) {
		return false;
	}

	const cellAbove = matrix[entity.y - 1]?.[entity.x];

	if (!cellAbove) {
		return false;
	}

	return cellAbove.type === 'Lava';
}

const Lava: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Lava',
	},

	objectSets: [ROOM_TYPE_SETTINGS.fortress.objectSet],
	graphicSets: [ROOM_TYPE_SETTINGS.fortress.objectGraphicSet],
	editorType: 'cell',
	settingsType: 'single',
	dimensions: 'xy',
	objectId: 0x30,
	param1: 'height',
	param2: 'width',
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x65a3,
			0x7a8b,
			0x7f6e,
			0x7fd6,
			0x1594,
			0x2e39,
			0x42bd,
			0x11,
			0x16,
			0x1a,
			0xdbe,
			0x123f,
			0x2bf,
		],
		romOffset: 0x131fe0,
		tiles: [
			[264, 266],
			[265, 267],
		],
	},

	toObjectBinary(x, y, w, h): number[] {
		return [getBankParam1(1, h), y, x, this.objectId!, w];
	},

	simpleRender(mw, mh) {
		return (
			<div className="Lava-bg bg-cover" style={{ width: mw, height: mh }} />
		);
	},

	render(_showDetails, _settings, _osc, entity, matrix) {
		const lavaAbove = isLavaAbove(entity, matrix);

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundColor: lavaAbove ? 'rgb(208, 0, 0)' : 'transparent',
		};

		return (
			<div
				style={style}
				className={clsx({
					'Lava-bg bg-cover': !isLavaAbove(entity, matrix),
				})}
			/>
		);
	},
};

export { Lava };
