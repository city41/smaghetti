import { client } from './client';

// this is because camel case in postgres is a pain
// so in the DB, always use snake case
type DBLevelVote = {
	user_id: string;
	level_id: string;
};

async function getAllVotes(): Promise<LevelVote[]> {
	const { data, error } = await client
		.from<DBLevelVote>('level_votes')
		.select('user_id, level_id');

	if (error) {
		throw error;
	}

	return (data ?? []).map((v) => ({
		userId: v.user_id,
		levelId: v.level_id,
	}));
}

export { getAllVotes };
