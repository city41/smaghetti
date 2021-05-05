import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { TransportSource } from '../components/Transport/TransportSource';
import { TransportEditDetails } from '../components/details/TransportEditDetails';
import { simpleSpriteBinary } from './util';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';

const DOOR_LOCK_OBJECT_ID = 0xce;

const SimpleBlackDoor: Entity = {
	paletteCategory: 'transport',
	paletteInfo: {
		title: 'Simple Black Door',
	},

	// this is for the lock sprite, which truly is universal
	spriteGraphicSets: [0, 0, 0, 0, 0, 0],
	objectSets: [ROOM_TYPE_SETTINGS.fortress.objectSet],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x5,
	width: 1,
	height: 2,

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
		romOffset: 0x16ad5c,
		tiles: [
			[{ tileIndex: 474 }, { tileIndex: 474, flip: 'h' }],
			[{ tileIndex: 475 }, { tileIndex: 475, flip: 'h' }],
			[{ tileIndex: 475 }, { tileIndex: 475, flip: 'h' }],
			[
				{ tileIndex: 474, flip: 'v' },
				{ tileIndex: 474, flip: 'hv' },
			],
		],
	},

	getTransports(room, x, y, settings) {
		const dest = settings.destination;

		if (dest) {
			return [
				{
					destRoom: dest.room as number,
					destX: dest.x as number,
					destY: dest.y as number,
					x,
					y,
					room,
					exitType: 0,
				},
			];
		}

		return [];
	},

	toObjectBinary(x, y) {
		return [0x40, y, x, this.objectId!];
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		if (settings.locked) {
			return simpleSpriteBinary(x, y, DOOR_LOCK_OBJECT_ID);
		} else {
			return [];
		}
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
			backgroundSize: '50% 100%',
		};

		return (
			<div
				className="SimpleBlackDoor-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
		};

		const body = (
			<div
				className="relative SimpleBlackDoor-bg bg-cover bg-no-repeat"
				style={style}
			>
				<TileSpace />
				{settings.locked && (
					<div
						className="DoorLock-bg absolute left-0 top-3"
						style={{ width: TILE_SIZE / 2, height: TILE_SIZE }}
					/>
				)}
				{settings.destination && (
					<TransportSource
						className="absolute top-0 left-0"
						destRoom={settings.destination.room}
						destX={settings.destination.x}
						destY={settings.destination.y}
						exitType={0}
					/>
				)}
			</div>
		);

		if (showDetails) {
			return (
				<TransportEditDetails
					width={TILE_SIZE}
					height={TILE_SIZE * 2}
					onDestinationSet={(newDestination) => {
						onSettingsChange({ ...settings, destination: newDestination });
					}}
					locked={!!settings.locked}
					onLockChange={(locked) => {
						onSettingsChange({ ...settings, locked });
					}}
				>
					{body}
				</TransportEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { SimpleBlackDoor };
