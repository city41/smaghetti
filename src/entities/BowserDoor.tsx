import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { TransportSource } from '../components/Transport/TransportSource';
import { TransportEditDetails } from '../components/details/TransportEditDetails';
import { simpleSpriteBinary } from './util';

const DOOR_LOCK_OBJECT_ID = 0xce;

/**
 * so far transports don't work on this door.
 * One problem is the transport's x position is always
 * half a tile off from where the door actually is. possibly
 * some of the unknown bytes in transports account for that,
 * or possibly this isn't really the bowser door at all just
 * a random object that happened to use bowser door tiles
 */
const BowserDoor: Entity = {
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x43,
	width: 2,
	height: 2,

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
		romOffset: 0x167674,
		tiles: [
			[39, 60, 61, 39],
			[39, 62, 63, 39],
			[39, 60, 61, 39],
			[39, 60, 61, 39],
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
			return simpleSpriteBinary(x + 1, y, DOOR_LOCK_OBJECT_ID);
		} else {
			return [];
		}
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
		};

		return (
			<div className="BowserDoor-bg bg-cover bg-no-repeat" style={style} />
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
		};

		const body = (
			<div
				className="relative BowserDoor-bg bg-cover bg-no-repeat"
				style={style}
			>
				<TileSpace />
				{settings.locked && (
					<div
						className="DoorLock-bg absolute left-3 top-3"
						style={{ width: TILE_SIZE / 2, height: TILE_SIZE }}
					/>
				)}
				{settings.destination && (
					<div
						className="absolute top-0 left-0"
						style={{ paddingLeft: TILE_SIZE / 2 }}
					>
						<TransportSource
							destRoom={settings.destination.room}
							destX={settings.destination.x}
							destY={settings.destination.y}
							exitType={0}
						/>
					</div>
				)}
			</div>
		);

		if (showDetails) {
			return (
				<TransportEditDetails
					width={TILE_SIZE * 2}
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

export { BowserDoor };
