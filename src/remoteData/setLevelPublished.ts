import { client } from './client';

export async function setLevelPublished(
	id: string,
	published: boolean
): Promise<void> {
	const { error } = await client
		.from('levels')
		.update({ published })
		.match({ id });

	if (error) {
		throw error;
	}
}
