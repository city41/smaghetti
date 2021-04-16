import { LevelTreeRoom } from '../types';
import { Entity } from '../../../entities/types';
import { entityMap } from '../../../entities/entityMap';

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

export function getEntityDefFromId(id: number): Entity | null {
	const entityDefs = Object.values(entityMap);

	return entityDefs.find((ed) => ed.objectId === id) ?? null;
}
