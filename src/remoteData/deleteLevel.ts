import { client } from './client';

export async function deleteLevel(id: string | null): Promise<void> {
	const { error } = await client
		.from('levels')
		.delete({ returning: 'minimal' })
		.eq('id', id);

	if (error) {
		throw error;
	}
}
