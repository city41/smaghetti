import { LevelTreeObject, LevelTreeRoom } from '../types';
import { Entity } from '../../../entities/types';
import { entityMap } from '../../../entities/entityMap';

const entityDefs = Object.values(entityMap);

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

export function getEntityDefFromId(obj: LevelTreeObject): Entity | null {
	return (
		entityDefs.find(
			(ed) => ed.objectId === obj.id && obj.bank === ed.emptyBank
		) ?? null
	);
}

export function getEntityDefFromPayloadId(obj: LevelTreeObject): Entity | null {
	return (
		entityDefs.find((ed) => {
			if (!ed.payloadToObjectId || ed.payloadBank !== obj.bank) {
				return false;
			}
			return Object.values(ed.payloadToObjectId).some((pid) => pid === obj.id);
		}) ?? null
	);
}
