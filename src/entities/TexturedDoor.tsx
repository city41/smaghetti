import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { TransportSource } from '../components/Transport/TransportSource';
import { TransportEditDetails } from '../components/details/TransportEditDetails';
import { simpleSpriteBinary } from './util';

const DOOR_LOCK_OBJECT_ID = 0xce;

const TexturedDoor: Entity = {
	paletteCategory: 'transport',
	paletteInfo: {
		title: 'Textured Door',
	},

	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x46,
	width: 1,
	height: 2,

	resource: {
		palette: [
			0x3340,
			0x7fff,
			0x0,
			0x4637,
			0x2ebb,
			0x3f3f,
			0x539f,
			0x0,
			0x0,
			0x2bff,
			0x291e,
			0x297f,
			0x2aff,
			0x0,
			0x0,
			0x0,
		],
		romOffset: 0x20e4f0,
		tiles: [
			[108, 109],
			[124, 125],
			[110, 111],
			[126, 127],
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
		return [0, y, x, this.objectId!];
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
			<div className="TexturedDoor-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
		};

		const body = (
			<div
				className="relative TexturedDoor-bg bg-cover bg-no-repeat"
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

export { TexturedDoor };
