import { insertError } from '../remoteData/insertError';
import { client } from '../remoteData/client';

type LogErrorProps = {
	context: string;
	message: string;
	stack?: string | null;
	level_data?: string | null;
};

async function logError({
	context,
	message,
	stack = null,
	level_data = null,
}: LogErrorProps) {
	const user_id = client.auth.user()?.id ?? null;
	const url = window.location.href;

	try {
		await insertError({ user_id, context, message, stack, level_data, url });
	} catch (e) {
		console.error('insertError, error:', e);
	}
}

export { logError };
