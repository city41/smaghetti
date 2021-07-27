import { client } from './client';

type InsertErrorProps = {
	url: string;
	user_id: string | null;
	context: string;
	message: string;
	stack: string | null;
	level_data: string | null;
};

export async function insertError({
	user_id,
	context,
	message,
	stack,
	level_data,
	url,
}: InsertErrorProps): Promise<void> {
	const { error } = await client
		.from('errors')
		.insert({ user_id, message, context, stack, level_data, url });

	if (error) {
		const { error: secondError } = await client.from('errors').insert({
			message: 'error inserting into errors table',
		});

		if (secondError) {
			console.error('unable to send error log', secondError);
		}
	}
}
