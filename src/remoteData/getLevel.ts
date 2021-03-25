import { client } from './client';

type LevelData = SerializedLevel;

export async function getLevel(id: string): Promise<LevelData | undefined> {
	const { data, error } = await client
		.from<LevelData>('levels')
		.select('*')
		.eq('id', id);

	if (error) {
		throw error;
	}

	return data?.[0];
}
