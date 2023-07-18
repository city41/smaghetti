const path = require('node:path');
const fsp = require('node:fs/promises');

const FETCH_URLS = [
	{
		fileRoot: 'get_all_published_levels',
		url:
			'https://cfmypkasixjnpkxfpylf.supabase.co/rest/v1/rpc/get_all_published_levels?offset={OFFSET}&limit={LIMIT}&order={ORDER}',
	},
	{
		fileRoot: 'get_published_levels_that_have_special_coins',
		url:
			'https://cfmypkasixjnpkxfpylf.supabase.co/rest/v1/rpc/get_published_levels_that_have_special_coins?offset={OFFSET}&limit={LIMIT}&order={ORDER}',
	},
];

const FETCH_CONFIG = {
	headers: {
		accept: '*/*',
		'accept-language': 'en-US,en;q=0.9',
		apikey:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjU1NTIxMywiZXhwIjoxOTMyMTMxMjEzfQ.oT8a5pEGoqiPFWwuyoe-kVWvhCIn6XTnQZDFDuA2AiE',
		authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjU1NTIxMywiZXhwIjoxOTMyMTMxMjEzfQ.oT8a5pEGoqiPFWwuyoe-kVWvhCIn6XTnQZDFDuA2AiE',
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
	body: '{"current_user_id":""}',
	method: 'POST',
};

const DEST_DIR = 'public/level-archive/';
const PAGE_SIZE = 20;

async function main() {
	const fetch = (await import('node-fetch')).default;
	const limit = PAGE_SIZE.toString();

	const orders = [
		{ key: 'newest', param: 'updated_at.desc.nullslast' },
		{ key: 'popular', param: 'total_vote_count.desc.nullslast' },
	];

	for (const fetchUrl of FETCH_URLS) {
		for (const order of orders) {
			let i = 0;
			let levelCount = 0;
			while (true) {
				const offset = (i * PAGE_SIZE).toString();
				const url = fetchUrl.url
					.replace('{OFFSET}', offset)
					.replace('{LIMIT}', limit)
					.replace('{ORDER}', order.param);
				const response = await fetch(url, FETCH_CONFIG);
				const data = await response.text();

				const pageLevelCount = JSON.parse(data).length;

				if (pageLevelCount === 0) {
					break;
				} else {
					levelCount += pageLevelCount;
					const fileName = `${fetchUrl.fileRoot}_order${order.key}_offset${offset}_limit${limit}.json`;
					const destPath = path.resolve(process.cwd(), DEST_DIR, fileName);
					await fsp.writeFile(destPath, data);
					console.log('wrote', destPath);

					++i;
				}
			}

			console.log({ fetchUrl, order, levelCount });
		}
	}
}

main()
	.then(() => {
		console.log('done');
	})
	.catch((e) => {
		console.error(e);
	});
