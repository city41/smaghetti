import 'ignore-styles';
import * as path from 'path';
import * as fs from 'fs';
import { Client } from 'pg';
import { convertLevelToLatestVersion } from '../src/level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../src/level/deserialize';
import { entityMap, EntityType } from '../src/entities/entityMap';
import { flattenCells } from '../src/levelData/util';
import { EntityCount, LevelStats } from '../src/stats/types';
import orderBy from 'lodash/orderBy';

async function queryForLevels(): Promise<SerializedLevel[]> {
	const client = new Client();
	await client.connect();

	const res = await client.query('select * from levels');
	await client.end();

	return res.rows;
}

async function getLevelDatas(): Promise<LevelData[]> {
	const serializedLevels = await queryForLevels();
	return serializedLevels.reduce<LevelData[]>((building, sl) => {
		const converted = convertLevelToLatestVersion(sl);

		if (converted) {
			return building.concat(deserialize(converted.data));
		} else {
			return building;
		}
	}, []);
}

function calcStats(levels: LevelData[]): LevelStats {
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

		if (!entityDef || !entityDef.paletteCategory) {
			return building;
		}

		const count = allEntities.filter((e) => e.type === entityType).length;

		return building.concat({
			type: entityType,
			count,
		});
	}, []);

	const entitiesByCount = orderBy(
		entitiesByCountUnsorted,
		['count', 'type'],
		['desc', 'asc']
	);
	return {
		lastUpdated: new Date().toString(),
		entitiesByCount,
	};
}

function writeStats(stats: LevelStats, filePath: string) {
	const src = `import type { LevelStats } from './types';
	
	export const stats: LevelStats = ${JSON.stringify(stats, null, 2)};`;

	fs.writeFileSync(filePath, src);
}

async function main() {
	const levels = await getLevelDatas();
	const stats = calcStats(levels);

	writeStats(stats, path.resolve(__dirname, '../src/stats/stats.ts'));
}

main()
	.then(() => {
		console.log('all done');
	})
	.catch((e) => {
		console.error('error occurred', e);
	});
