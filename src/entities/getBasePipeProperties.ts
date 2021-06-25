import { DestinationSetProps } from '../components/Transport/TransportDestinationModal/TransportDestinationModal';
import {
	getEntityTileBounds,
	pointIsInside,
} from '../components/editor/editorSlice';
import { TILE_SIZE } from '../tiles/constants';

function getPipeExitType(
	destination: DestinationSetProps,
	rooms: RoomData[]
): EditorTransport['exitType'] | null {
	const destRoom = rooms[destination.room];

	// there should be a pipe at the destination
	const destPipe = destRoom.stage.entities.find((e) => {
		return pointIsInside(destination, getEntityTileBounds(e));
	});

	if (!destPipe) {
		// in a bad state, we can't know how to exit the pipe
		return null;
	}

	// if this is an up or up-down pipe, are we at the top left corner?
	if (
		((destPipe.type === 'PipeVertical' &&
			(destPipe.settings?.direction === 'up' ||
				destPipe.settings?.direction === 'up-down')) ||
			destPipe.type === 'PipeAirshipVertical') &&
		// TODO: stop using pixel coords for entities
		destPipe.x / TILE_SIZE === destination.x &&
		destPipe.y / TILE_SIZE === destination.y
	) {
		return 'up-from-pipe';
	}

	// if this is a down or up-down pipe, are we at its lower left corner?
	if (
		destPipe.type === 'PipeVertical' &&
		(destPipe.settings?.direction === 'down' ||
			destPipe.settings?.direction === 'up-down') &&
		// TODO: stop using pixel coords for entities
		destPipe.x / TILE_SIZE === destination.x &&
		destPipe.y / TILE_SIZE + (destPipe.settings?.height ?? 1) - 1 ===
			destination.y
	) {
		return 'down-from-pipe';
	}

	// if this is a right or right-left pipe, are we at its upper right corner?
	if (
		destPipe.type === 'PipeHorizontal' &&
		(destPipe.settings?.direction === 'right' ||
			destPipe.settings?.direction === 'right-left') &&
		// TODO: stop using pixel coords for entities
		destPipe.x / TILE_SIZE + (destPipe.settings?.width ?? 1) - 1 ===
			destination.x &&
		destPipe.y / TILE_SIZE === destination.y
	) {
		return 'horizontal-travel-right-pipe';
	}

	// if this is a left or right-left pipe, are we at its upper left corner?
	if (
		destPipe.type === 'PipeHorizontal' &&
		(destPipe.settings?.direction === 'left' ||
			destPipe.settings?.direction === 'right-left') &&
		// TODO: stop using pixel coords for entities
		destPipe.x / TILE_SIZE === destination.x &&
		destPipe.y / TILE_SIZE === destination.y
	) {
		return 'horizontal-travel-left-pipe';
	}

	// uh oh, the pipes are not properly configured. The user gets a warning
	// in the editor when this happens
	return null;
}

export function getBasePipeProperties(type: EntityType) {
	return {
		getTransports(
			room: number,
			rooms: RoomData[],
			x: number,
			y: number,
			settings: EditorEntitySettings
		) {
			const dest = settings.destination as DestinationSetProps;

			let sourceY = y;

			if (type === 'PipeVertical' || type === 'PipeAirshipVertical') {
				if (settings.direction === 'up') {
					sourceY = y - 1;
				} else {
					sourceY = y + settings.height - 3;
				}
			}

			if (dest) {
				return [
					{
						destRoom: dest.room,
						destX: dest.x,
						destY: dest.y,
						x,
						y: sourceY,
						room,
						exitCategory: 'pipe',
						exitType: getPipeExitType(dest, rooms) ?? 'up-from-pipe',
					},
				];
			}

			return [];
		},

		getWarning(
			settings: EditorEntitySettings,
			_entity: EditorEntity,
			_room: RoomData,
			rooms: RoomData[]
		) {
			if (settings.destination) {
				const exitType = getPipeExitType(
					settings.destination as DestinationSetProps,
					rooms
				);

				if (!exitType) {
					return 'Warp must be placed at exit end of a destination pipe';
				}
			}
		},
	};
}
