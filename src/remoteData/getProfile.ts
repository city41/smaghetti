import { client } from './client';

type ProfileData = {
	user: User;
	levels: SerializedLevel[];
};

export async function getProfile(id: string): Promise<ProfileData> {
	const { data: userData, error: userError } = await client
		.from<User>('users')
		// TODO: username
		.select('id, username, role')
		.eq('id', id)
		.single();

	if (userError) {
		throw userError;
	}

	if (!userData) {
		throw new Error(`User with id ${id} not found`);
	}

	let selectPromise = client.from<SerializedLevel>('levels').select(
		`
      id,
      name,
      description,
      published,
      data,
      created_at,
      updated_at,
      version,
      user:user_id (username, role)
    `
	);

	if (userData.role !== 'admin') {
		// @ts-ignore
		selectPromise = selectPromise.eq('user_id', id);

		// if the user is not an admin, then row level security will prevent selecting all levels
		// so doing this if check on the client is safe
	}

	selectPromise = selectPromise.order('updated_at', { ascending: false });

	const { data: userLevels, error: levelsError } = await selectPromise;

	if (levelsError) {
		throw levelsError;
	}

	if (!userLevels) {
		throw new Error(`Failed to get levels for user with id ${id}`);
	}

	return { user: userData, levels: userLevels };
}

export type { ProfileData };
