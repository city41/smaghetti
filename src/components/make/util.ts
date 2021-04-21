import { entityMap, EntityType } from '../../entities/entityMap';

function isCompatibleEntity(
	entityType: EntityType,
	settings: RoomSettings
): boolean {
	const { objectSet, objectGraphicSet } = settings;

	const entityDef = entityMap[entityType];
	const isCompatibleObjectSetWise =
		!entityDef.objectSets || entityDef.objectSets.includes(objectSet);
	const isCompatibleGraphicSetWise =
		!entityDef.graphicSets || entityDef.graphicSets.includes(objectGraphicSet);

	return isCompatibleObjectSetWise && isCompatibleGraphicSetWise;
}

export { isCompatibleEntity };
