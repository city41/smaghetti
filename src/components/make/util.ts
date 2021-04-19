import { entityMap, EntityType } from '../../entities/entityMap';

function isCompatibleEntity(
	entityType: EntityType,
	settings: RoomSettings
): boolean {
	const { objectSet, graphicSet } = settings;

	const entityDef = entityMap[entityType];
	const isCompatibleObjectSetWise =
		!entityDef.objectSets || entityDef.objectSets.includes(objectSet);
	const isCompatibleGraphicSetWise =
		!entityDef.graphicSets || !entityDef.graphicSets.includes(graphicSet);

	return isCompatibleObjectSetWise && isCompatibleGraphicSetWise;
}

export { isCompatibleEntity };
