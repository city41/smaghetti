import { client } from './client';

async function getLevels(): Promise<SerializedLevel[]> {
	const { data, error } = await client
		.from<SerializedLevel>('levels')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(40);

	if (error) {
		throw error;
	}

	return data ?? [];
}

export { getLevels };
