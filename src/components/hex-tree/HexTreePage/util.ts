import { LevelTreeRoom } from '../types';

export function isRoomEmpty(room: LevelTreeRoom): boolean {
	return (
		room.objects.objects.length === 0 &&
		room.sprites.sprites.length === 0 &&
		room.transports.transports.length === 0
	);
}

export function toHexString(b: number): string {
	const asHex = b.toString(16);

	if (asHex.length === 1) {
		return `0${asHex}`;
	} else {
		return asHex;
	}
}
