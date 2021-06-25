import React from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { TransportSource } from '../components/Transport/TransportSource';
import { TransportEditDetails } from './detailPanes/TransportEditDetails';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { DestinationSetProps } from '../components/Transport/TransportDestinationModal/TransportDestinationModal';
import {
	getEntityTileBounds,
	pointIsInside,
} from '../components/editor/editorSlice';

const DOOR_LOCK_OBJECT_ID = 0xce;

/**
 * Doors (textured, wood, simple black) have a lot in common.
 * Those commonalities were extracted to here to avoid constantly
 * repeating a lot of code
 */
function getBaseDoorProperties(bgClass: string, objectId: number) {
	return {
		paletteCategory: 'transport',

		// this is for the lock sprite, which truly is universal
		spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
		layer: 'stage',
		editorType: 'entity',
		dimensions: 'none',
		emptyBank: 0,
		width: 1,
		height: 2,
		objectId,

		getTransports(
			room: number,
			_rooms: RoomData[],
			x: number,
			y: number,
			settings: EditorEntitySettings
		) {
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
						exitCategory: 'door',
						exitType: 'door',
					} as const,
				];
			}

			return [];
		},

		toObjectBinary(x: number, y: number) {
			return [0, y, x, this.objectId];
		},

		toSpriteBinary(
			x: number,
			y: number,
			_w: number,
			_h: number,
			settings: EditorEntitySettings
		) {
			if (settings.locked) {
				return [0, DOOR_LOCK_OBJECT_ID, x, y];
			} else {
				return [];
			}
		},

		simpleRender(size: number) {
			const style = {
				width: size,
				height: size,
				backgroundSize: '50% 100%',
			};

			return (
				<div
					className={clsx(bgClass, 'bg-center bg-no-repeat')}
					style={style}
				/>
			);
		},

		render(
			showDetails: boolean,
			settings: EditorEntitySettings,
			onSettingsChange: (newSettings: EditorEntitySettings) => void
		) {
			const style = {
				width: TILE_SIZE,
				height: TILE_SIZE * 2,
			};

			const body = (
				<div
					className={clsx(bgClass, 'relative bg-cover bg-no-repeat')}
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
							className="absolute bottom-0 right-0"
							destRoom={settings.destination.room}
							destX={settings.destination.x}
							destY={settings.destination.y}
							exitCategory="door"
						/>
					)}
				</div>
			);

			if (showDetails) {
				return (
					<TransportEditDetails
						width={TILE_SIZE}
						height={TILE_SIZE * 2}
						destination={settings.destination}
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

		getWarning(
			settings: EditorEntitySettings,
			_entity: EditorEntity,
			_room: RoomData,
			rooms: RoomData[]
		) {
			if (settings.destination) {
				const destination = settings.destination as DestinationSetProps;
				const destRoom = rooms[destination.room];

				// the dest should be on top of a pipe
				const destEntity = destRoom.stage.entities.find((e) => {
					return pointIsInside(destination, getEntityTileBounds(e));
				});

				if (destEntity?.type === 'PipeVertical') {
					return 'Doors can not warp to pipes';
				}

				if (
					['SimpleBlackDoor', 'TexturedDoor', 'WoodDoor'].includes(
						destEntity?.type ?? ''
					)
				) {
					if (destEntity!.y / TILE_SIZE !== destination.y) {
						return 'The exit should be at the top of the door';
					}
				}
			}
		},
	} as const;
}

export { getBaseDoorProperties };
