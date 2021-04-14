import { LevelTreeRoom } from '../types';

export function isRoomEmpty(room: LevelTreeRoom): boolean {
	return (
		room.objects.objects.length === 0 &&
		room.sprites.sprites.length === 0 &&
		room.transports.transports.length === 0
	);
}
