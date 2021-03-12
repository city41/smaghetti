import { client } from './client';

type GetLevelsResult = {
	popular: SerializedLevel[];
	recent: SerializedLevel[];
};

async function getLevels(): Promise<GetLevelsResult> {
	const { data: popular, error: popularError } = await client.rpc(
		'get_levels',
		{ sort: 'popular' }
	);

	if (popularError) {
		throw popularError;
	}

	const { data: recent, error: recentError } = await client.rpc('get_levels', {
		sort: 'recent',
	});

	if (recentError) {
		throw recentError;
	}

	return {
		popular: popular ?? [],
		recent: recent ?? [],
	};
}

export { getLevels };
export type { GetLevelsResult };
