import { client } from './client';

// this function is weird. Supabase's postrest client can do json queries, but it seems like grabbing
// the first room this way data->rooms[0] is a hack. It works, but the resulting data comes back in
// a strange shape that needs to be molded into a SerializedLevel.
//
// also, data->rooms[0] must be the last thing in the query string, everything after it is ignored

async function getPublishedLevels(): Promise<SerializedLevel[]> {
	const { data, error } = await client
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.from<any>('levels')
		.select(
			'id, name, created_at, updated_at, version, data->settings, user:user_id (username), data->rooms[0]'
		)
		.eq('published', true)
		.order('updated_at', { ascending: false })
		.limit(40);

	if (error) {
		throw error;
	}

	return (data ?? []).map((row) => {
		return {
			...row,
			data: { rooms: row.rooms, settings: row.settings },
		};
	}) as SerializedLevel[];
}

export { getPublishedLevels };
