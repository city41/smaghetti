import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';
import { KoopalingViewDetails } from './detailPanes/KoopalingViewDetails';
import { KoopalingEditDetails } from './detailPanes/KoopalingEditDetails';

const Morton: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-boss',
		title: 'Morton',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, 2, -1, -1, 2],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { stompCount: 3, fireballCount: 10 },
	objectId: 0x14,
	koopalingId: 2,
	width: 1,
	height: 2,

	resource: {
		romOffset: 0x1724f0,
		palettes: [
			[
				0x7f96,
				0x0,
				0x7fff,
				0x4210,
				0x5294,
				0x6739,
				0x329d,
				0x431e,
				0x53bf,
				0x77bd,
				0x1154,
				0x21f9,
				0x2a7d,
				0x37f,
				0x27f,
				0x11f,
			],
		],
		tiles: [
			[32, 33, 34],
			[48, 49, 50],
			[35, 36, 37],
			[51, 52, 53],
		],
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		const fireballCount = (settings.fireballCount ??
			this.defaultSettings!.fireballCount) as number;
		const stompCount = (settings.stompCount ??
			this.defaultSettings!.stompCount) as number;

		const stompParam = (this.koopalingId! << 4) | (stompCount & 0xf);

		return [1, this.objectId, x, y, stompParam, fireballCount & 0xff];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '75% 100%' };

		return (
			<div
				className="relative Morton-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render(showDetails, settings, onSettingsChange) {
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
			top: 9,
			left: -7,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: 0,
			left: 0,
		};

		const body = (
			<div className="relative Morton-bg bg-cover" style={style}>
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

export { Morton };
