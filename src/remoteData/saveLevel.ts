import { client } from './client';
import { CURRENT_VERSION } from '../level/versioning/convertLevelToLatestVersion';

export async function saveLevel(
	id: string | null,
	name: string,
	description: string,
	data: SerializedLevelData
): Promise<string> {
	const { data: returnedId, error } = await client.rpc<string>('save_level', {
		existing_id: id,
		name: (name && name.trim()) || 'untitled level',
		description,
		data,
		version: CURRENT_VERSION,
	});

	if (error) {
		throw error;
	}

	if (!returnedId) {
		throw new Error('An unknown error occurred creating the level');
	}

	// the supabase types claim returnedId is string[], but it is actually string
	// TODO: figure this out
	return (returnedId as unknown) as string;
}
