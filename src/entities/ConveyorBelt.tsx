import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ResizeEditDetails } from '../components/details/ResizeEditDetails';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const ConveyorBelt: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Conveyor Belt',
		description: 'Only goes in one direction so far...',
	},

	objectSets: encodeObjectSets([
		[2, 10],
		[2, 11],
		[2, 12],
		[2, 13],
		[2, 14],
		[2, 15],
		[2, 1],
		[2, 2],
		[2, 3],
		[2, 4],
		[2, 5],
		[2, 6],
		[2, 8],
		[2, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
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
