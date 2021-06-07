import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { TileSpace } from '../TileSpace';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from '../constants';
import { Pursuit, pursuitToIcon, ThwompEditDetails } from './ThwompEditDetails';

const pursuitToObjectId: Record<Pursuit, number> = {
	down: 0x8a,
	left: 0x8b,
	right: 0x8c,
	up: 0x8d,
	'up-left': 0x8e,
	'down-left': 0x8f,
};

const Thwomp: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Thwomp',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [6, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { pursuit: 'down' },
	objectId: 0x8a,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x39ce,
			0x4a52,
			0x5ef7,
			0x7a8b,
			0x7f6e,
			0x7fd6,
			0x6f7b,
			0x19f8,
			0x2e5c,
			0x42ff,
			0x1b1f,
			0x1a1f,
			0x1d,
		],
		romOffset: 0x167674,
		tiles: [
			[170, 171, { romOffset: 0x167674, tileIndex: 170, flip: 'h' }],
			[186, 187, { romOffset: 0x167674, tileIndex: 186, flip: 'h' }],
			[174, 175, { romOffset: 0x167674, tileIndex: 174, flip: 'h' }],
			[190, 191, { romOffset: 0x167674, tileIndex: 190, flip: 'h' }],
		],
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		const pursuit = (settings.pursuit ??
			this.defaultSettings!.pursuit) as Pursuit;
		const objectId = pursuitToObjectId[pursuit];
		return [0, objectId, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '75% 100%',
		};

		return <div className="Thwomp-bg bg-center bg-no-repeat" style={style} />;
	},

	render(showDetails, settings, onSettingsChange) {
		const pursuit = (settings.pursuit ??
			this.defaultSettings!.pursuit) as Pursuit;

		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const PursuitIcon = pursuitToIcon[pursuit];

		const body = (
			<div className="relative Thwomp-bg bg-center bg-no-repeat" style={style}>
				<div className="absolute left-0 top-0" style={spaceStyle}>
					<TileSpace />
				</div>
				<div className="absolute bottom-0 left-0 w-full grid place-items-center">
					<div className="bg-blue-500" style={{ padding: 1 }}>
						<PursuitIcon className="w-1.5 h-1.5 text-white" />
					</div>
				</div>
			</div>
		);

		if (showDetails) {
			return (
				<ThwompEditDetails
					currentPursuit={pursuit}
					onPursuitChange={(newPursuit) =>
						onSettingsChange({ pursuit: newPursuit })
					}
				>
					{body}
				</ThwompEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { Thwomp };
