import { client } from './client';

async function getPublishedLevels(): Promise<SerializedLevel[]> {
	const { data, error } = await client
		.from<SerializedLevel>('levels')
		.select('*, user:user_id (username)')
		.eq('published', true)
		.order('updated_at', { ascending: false })
		.limit(60);

	if (error) {
		throw error;
	}

	return data ?? [];
}

export { getPublishedLevels };
