import 'ignore-styles';
import { flattenCells } from '../../src/levelData/util';
import { EntityCount, LevelStats } from '../../src/stats/types';
import { entityMap, EntityType } from '../../src/entities/entityMap';
import orderBy from 'lodash/orderBy';

export function entitiesByCount(
	levels: LevelData[]
): LevelStats['entitiesByCount'] {
	const allRooms = levels.reduce<RoomData[]>((building, level) => {
		return building.concat(level.rooms);
	}, []);

	const allEntities = allRooms.reduce<EditorEntity[]>((building, room) => {
		const flattendActorCells = flattenCells(room.actors.matrix);
		const flattendStageCells = flattenCells(room.stage.matrix);
		return building.concat(
			flattendActorCells,
			flattendStageCells,
			room.actors.entities,
			room.stage.entities
		);
	}, []);

	const entitiesByCountUnsorted: EntityCount[] = (Object.keys(
		entityMap
	) as EntityType[]).reduce<EntityCount[]>((building, entityType) => {
		const entityDef = entityMap[entityType];

		if (
			!entityDef ||
			!entityDef.paletteCategory ||
			entityDef.paletteCategory === 'hextree'
		) {
			return building;
		}

		const count = allEntities.filter((e) => e.type === entityType).length;

		return building.concat({
			type: entityType,
			count,
		});
	}, []);

	return orderBy(entitiesByCountUnsorted, ['count', 'type'], ['desc', 'asc']);
}
