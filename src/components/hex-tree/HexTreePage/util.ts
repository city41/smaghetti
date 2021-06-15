import { LevelTreeObject, LevelTreeRoom } from '../types';
import { Entity } from '../../../entities/types';
import { entityMap, EntityType } from '../../../entities/entityMap';
import { decodeObjectSet } from '../../../entities/util';

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

export function getEntityType(entityDef: Entity): EntityType {
	const entities = Object.entries(entityMap);

	const matchedEntity = entities.find((e) => e[1] === entityDef);
	return matchedEntity?.[0] as EntityType;
}

export function getEntityDefFromId(
	obj: LevelTreeObject,
	objectSet: number
): Entity | null {
	return (
		entityDefs.find((ed) => {
			if (
				ed.objectSets &&
				!ed.objectSets.some((os) => decodeObjectSet(os)[0] === objectSet)
			) {
				return false;
			}

			return (
				(ed.objectId === obj.id ||
					(ed.alternateObjectIds ?? []).includes(obj.id)) &&
				obj.bank === ed.emptyBank
			);
		}) ?? null
	);
}

export function getEntityDefFromPayloadId(
	obj: LevelTreeObject,
	objectSet: number
): Entity | null {
	return (
		entityDefs.find((ed) => {
			if (
				ed.objectSets &&
				!ed.objectSets.some((os) => decodeObjectSet(os)[0] === objectSet)
			) {
				return false;
			}

			if (!ed.payloadToObjectId || ed.payloadBank !== obj.bank) {
				return false;
			}
			return Object.values(ed.payloadToObjectId).some((pid) => pid === obj.id);
		}) ?? null
	);
}
