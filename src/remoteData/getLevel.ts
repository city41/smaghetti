import { client } from './client';

export async function getLevel(
	id: string
): Promise<SerializedLevel | undefined> {
	const { data, error } = await client
		.from<SerializedLevel>('levels')
		.select('*, user:user_id (username)')
		.eq('id', id);

	if (error) {
		throw error;
	}

	return data?.[0];
}
