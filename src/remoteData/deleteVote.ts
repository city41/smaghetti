import { client } from './client';
import { logError } from '../reporting/logError';

export async function deleteVote({
	userId,
	levelId,
}: LevelVote): Promise<void> {
	const { error } = await client
		.from('level_votes')
		.delete()
		.eq('user_id', userId)
		.eq('level_id', levelId);

	if (error) {
		logError({
			context: 'deleteVote',
			level_data: null,
			message: error?.message ?? 'supabase error deleting vote',
			stack: error?.details ?? 'none',
		});
	}
}
