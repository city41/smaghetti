import { client } from './client';

type ProfileData = {
	user: User;
	levels: SerializedLevel[];
};

export async function getProfile(id: string): Promise<ProfileData> {
	const { data: userData, error: userError } = await client
		.from<User>('users')
		// TODO: username
		.select('id, username')
		.eq('id', id)
		.single();

	if (userError) {
		throw userError;
	}

	if (!userData) {
		throw new Error(`User with id ${id} not found`);
	}

	const { data: userLevels, error: levelsError } = await client
		.from<SerializedLevel>('levels')
		.select(
			`
      id,
      name,
      description,
      published,
      data,
      created_at,
      updated_at,
      version
    `
		)
		.order('updated_at', { ascending: false });

	if (levelsError) {
		throw levelsError;
	}

	if (!userLevels) {
		throw new Error(`Failed to get levels for user with id ${id}`);
	}

	return { user: userData, levels: userLevels };
}

export type { ProfileData };
