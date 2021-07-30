import { insertError } from '../remoteData/insertError';
import { client } from '../remoteData/client';

type LogErrorProps = {
	context: string;
	message: string;
	stack?: string | null;
	level_data?: string | null;
};

const GOOGLE_POST_URL =
	'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdxD1WFB8tIs0OapMpie1TmfyBToXUuphLhnTtFhOGaMU9S8w/formResponse';
const GOOGLE_ENTRY_NAMES = {
	message: 'entry.1360148685',
	stack: 'entry.283058055',
	context: 'entry.1698516925',
	level_data: 'entry.1247355775',
};

async function sendToGoogle({
	context,
	message,
	stack = null,
	level_data = null,
}: LogErrorProps) {
	const googleData = {
		[GOOGLE_ENTRY_NAMES.message]: message,
		[GOOGLE_ENTRY_NAMES.context]: context,
		[GOOGLE_ENTRY_NAMES.stack]: stack ?? '',
		[GOOGLE_ENTRY_NAMES.level_data]: level_data ?? '',
	};
	const encodedValues = Object.keys(googleData).map((key) => {
		const encKey = encodeURIComponent(key);
		const encValue = encodeURIComponent(googleData[key]);
		return `${encKey}=${encValue}`;
	});
	const body = encodedValues.join('&').replace(/%20/g, '+');

	await fetch(GOOGLE_POST_URL, {
		method: 'POST',
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body,
	});
}

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
		console.error('supabase insertError, error:', e);
	}

	// also send to google as a backup
	await sendToGoogle({ message, context, stack, level_data });
}

export { logError };
