import { entityMap, EntityType } from '../../entities/entityMap';

function isCompatibleEntity(
	entityType: EntityType,
	settings: RoomSettings
): boolean {
	const { objectSet } = settings;

	const entityDef = entityMap[entityType];
	const isCompatibleObjectSetWise =
		!entityDef.objectSets || entityDef.objectSets.includes(objectSet);

	return isCompatibleObjectSetWise;
}

export { isCompatibleEntity };
