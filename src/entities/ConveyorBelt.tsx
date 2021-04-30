import type { Entity } from './types';
import { getBankParam1 } from './util';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ResizeEditDetails } from '../components/details/ResizeEditDetails';

const ConveyorBelt: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Conveyor Belt',
		description: 'Only goes in one direction so far...',
	},

	objectSets: [ROOM_TYPE_SETTINGS.fortress.objectSet],
	graphicSets: [ROOM_TYPE_SETTINGS.fortress.objectGraphicSet],
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 1, height: 1 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x32,
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x15d2,
			0x2257,
			0x2afc,
			0x37be,
			0x20ba,
			0x21be,
			0x32df,
			0x3192,
			0x1636,
			0x2a9c,
			0x42ff,
			0x0,
			0x0,
		],
		romOffset: 0x131fe0,
		tiles: [
			[304, 304],
			[304, 304],
		],
	},

	toObjectBinary(x, y, _w, _h, settings) {
		const width = settings.width ?? 1;
		return [getBankParam1(1, width - 1), y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="ConveyorBelt-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const width = settings.width ?? 1;

		const style = {
			width: width * TILE_SIZE,
			height: TILE_SIZE,
		};

		const body = <div className="ConveyorBelt-bg" style={style} />;

		if (showDetails) {
			return (
				<ResizeEditDetails
					width={TILE_SIZE}
					height={TILE_SIZE}
					currentWidth={width}
					onResizeChange={(newWidth) => onSettingsChange({ width: newWidth })}
				>
					{body}
				</ResizeEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { ConveyorBelt };
