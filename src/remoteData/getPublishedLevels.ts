import { client } from './client';

async function getPublishedLevels(
	username?: string
): Promise<SerializedLevel[]> {
	let query = client
		.from<SerializedLevel>('levels')
		.select('*, user:user_id!inner(username)')
		.eq('published', true)
		.order('updated_at', { ascending: false })
		.limit(200);

	if (username) {
		// @ts-ignore
		query = query.eq('user.username', username);
	}

	const { data, error } = await query;

	if (error) {
		throw error;
	}

	return data ?? [];
}

export { getPublishedLevels };
