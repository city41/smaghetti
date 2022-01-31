import 'ignore-styles';
import * as path from 'path';
import * as fs from 'fs';
import { Client } from 'pg';
import { convertLevelToLatestVersion } from '../src/level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../src/level/deserialize';
import { LevelStats } from '../src/stats/types';
import { entitiesByCount } from './stats/entitiesByCount';
import { roomsPerLevelPercentages } from './stats/roomsPerLevelPercentages';

async function queryForLevels(): Promise<SerializedLevel[]> {
	const client = new Client(process.env.DATABASE_URL);
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
	return {
		lastUpdated: new Date().toString(),
		entitiesByCount: entitiesByCount(levels),
		roomsPerLevelPercentages: roomsPerLevelPercentages(levels),
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

if (!process.env.DATABASE_URL) {
	console.error(
		'set DATABASE_URL as an env variable to run this script, just like running migrations, see supabase.md'
	);
	process.exit(1);
}

main()
	.then(() => {
		console.log('all done');
	})
	.catch((e) => {
		console.error('error occurred', e);
	});
