import { client } from './client';

export async function setUsername(
	userId: string,
	username: string
): Promise<void> {
	const { error } = await client
		.from('users')
		.update({ username })
		.match({ id: userId });

	if (error) {
		throw error;
	}
}
