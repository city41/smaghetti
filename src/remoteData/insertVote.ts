import { client } from './client';
import { logError } from '../reporting/logError';

export async function insertVote({
	userId,
	levelId,
}: LevelVote): Promise<void> {
	const { error } = await client
		.from('level_votes')
		.insert({ user_id: userId, level_id: levelId });

	if (error) {
		logError({
			context: 'insertVote',
			level_data: null,
			message: error?.message ?? 'supabase error inserting vote',
			stack: error?.details ?? 'none',
		});
	}
}
