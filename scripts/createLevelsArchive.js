const path = require('node:path');
const fsp = require('node:fs/promises');

const FETCH_URL =
	'https://cfmypkasixjnpkxfpylf.supabase.co/rest/v1/rpc/get_all_published_levels?offset={OFFSET}&limit={LIMIT}&order=updated_at.desc.nullslast';
const FETCH_CONFIG = {
	headers: {
		accept: '*/*',
		'accept-language': 'en-US,en;q=0.9',
		apikey:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjU1NTIxMywiZXhwIjoxOTMyMTMxMjEzfQ.oT8a5pEGoqiPFWwuyoe-kVWvhCIn6XTnQZDFDuA2AiE',
		authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IktXWld1WmFtYXE0RGtWc2ciLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjkwMDY0MDA4LCJpYXQiOjE2ODk0NTkyMDgsImlzcyI6Imh0dHBzOi8vaHR0cHM6Ly9jZm15cGthc2l4am5wa3hmcHlsZi5zdXBhYmFzZS5jby9hdXRoL3YxIiwic3ViIjoiMzE3ZDg0YTktNTRmYy00MTA5LTg4NDQtYjFjMjExYWIxYzI2IiwiZW1haWwiOiJtYXR0QHNtYWdoZXR0aS5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIn0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJzZXNzaW9uX2lkIjoiMDI2OTQxODQtOWFiYi00MWFkLWFkOWYtOWMxMDIwNWM4MzVhIn0.8nmNHZi478WXXl7qik1T96Z-0UqN4XgDdDOBFDFw7P8',
		'content-profile': 'public',
		'content-type': 'application/json',
		prefer: 'count=exact',
		'sec-ch-ua':
			'"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Linux"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'cross-site',
		'x-client-info': 'supabase-js/1.29.1',
		Referer: 'https://smaghetti.com/',
		'Referrer-Policy': 'strict-origin-when-cross-origin',
	},
	body: '{"current_user_id":"317d84a9-54fc-4109-8844-b1c211ab1c26"}',
	method: 'POST',
};

const DEST_DIR = 'public/level-archive/';
const PAGE_SIZE = 20;

async function main() {
	const limit = PAGE_SIZE.toString();

	const fetch = (await import('node-fetch')).default;

	for (let i = 0; i < 10; ++i) {
		const offset = (i * PAGE_SIZE).toString();
		const url = FETCH_URL.replace('{OFFSET}', offset).replace('{LIMIT}', limit);
		const response = await fetch(url, FETCH_CONFIG);
		const data = await response.text();

		const fileName = `get_all_published_levels_offset${offset}_limit${limit}.json`;
		const destPath = path.resolve(process.cwd(), DEST_DIR, fileName);
		await fsp.writeFile(destPath, data);
		console.log('wrote', destPath);
	}
}

main()
	.then(() => {
		console.log('done');
	})
	.catch((e) => {
		console.error(e);
	});
