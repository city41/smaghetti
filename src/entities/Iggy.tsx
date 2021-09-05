import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';
import { KoopalingViewDetails } from './detailPanes/KoopalingViewDetails';
import { KoopalingEditDetails } from './detailPanes/KoopalingEditDetails';
import { parseKoopalingSprite } from './util';

const Iggy: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-boss',
		title: 'Iggy',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, 2, -1, -1, 3],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { stompCount: 3, fireballCount: 10 },
	objectId: 0x14,
	koopalingId: 4,
	width: 1,
	height: 2,

	resource: {
		romOffset: 0x1724f0,
		palettes: [
			[
				0x7f96,
				0x0,
				0x7fff,
				0x6609,
				0x768e,
				0x7f11,
				0x4631,
				0x5ad6,
				0x6b5a,
				0x7fb6,
				0x11f9,
				0x227d,
				0x371f,
				0x37f,
				0x23f,
				0x7e,
			],
		],
		tiles: [
			[103, 104, 105],
			[119, 120, 121],
			[96, 97, 98],
			[112, 113, 114],
		],
	},

	toSpriteBinary({ x, y, settings }) {
		const fireballCount = (settings.fireballCount ??
			this.defaultSettings!.fireballCount) as number;
		const stompCount = (settings.stompCount ??
			this.defaultSettings!.stompCount) as number;

		const stompParam = (this.koopalingId! << 4) | (stompCount & 0xf);

		return [1, this.objectId, x, y, stompParam, fireballCount & 0xff];
	},

	parseSprite(data, offset) {
		return parseKoopalingSprite(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '75% 100%' };

		return (
			<div className="relative Iggy-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render({ showDetails, settings, onSettingsChange }) {
		const stompCount = (settings.stompCount ??
			this.defaultSettings!.stompCount) as number;
		const fireballCount = (settings.fireballCount ??
			this.defaultSettings!.fireballCount) as number;

		const style = {
			width: TILE_SIZE * 1.5,
			height: TILE_SIZE * 2,
		};

		const wandStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: 10,
			left: -6,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: 0,
			left: 0,
		};

		const body = (
			<div className="relative Iggy-bg bg-cover" style={style}>
				<div className="absolute KoopalingWand-bg" style={wandStyle} />
				<div className="absolute" style={spaceStyle}>
					<TileSpace />
				</div>
				<KoopalingViewDetails
					stompCount={stompCount}
					fireballCount={fireballCount}
				/>
			</div>
		);

		if (showDetails) {
			return (
				<KoopalingEditDetails
					currentStompCount={stompCount}
					currentFireballCount={fireballCount}
					onSettingsChange={onSettingsChange}
				>
					{body}
				</KoopalingEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { Iggy };
