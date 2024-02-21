const path = require('node:path');
const fsp = require('node:fs/promises');

const SUPABASE_ROOT = 'https://cfmypkasixjnpkxfpylf.supabase.co/rest/v1/rpc/';

const FETCH_URLS = [
	{
		fileRoot: 'get_all_published_levels',
		url: `${SUPABASE_ROOT}get_all_published_levels?offset={OFFSET}&limit={LIMIT}&order={ORDER}`,
		paged: true,
		body: '{"current_user_id":""}',
	},
	{
		fileRoot: 'get_published_levels_that_have_special_coins',
		url: `${SUPABASE_ROOT}get_published_levels_that_have_special_coins?offset={OFFSET}&limit={LIMIT}&order={ORDER}`,
		paged: true,
		body: '{"current_user_id":""}',
	},
	{
		fileRoot: 'get_published_levels_that_have_ecoins',
		url: `${SUPABASE_ROOT}get_published_levels_that_have_ecoins?order={ORDER}`,
		paged: false,
		body: '',
	},
];

const ORDERS = [
	{ key: 'newest', param: 'updated_at.desc.nullslast' },
	{ key: 'popular', param: 'total_vote_count.desc.nullslast' },
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
	method: 'POST',
};

const DEST_DIR = 'public/level-archive/';
const PAGE_SIZE = 20;

async function main() {
	const fetch = (await import('node-fetch')).default;
	const limit = PAGE_SIZE.toString();

	for (const fetchUrl of FETCH_URLS) {
		for (const order of ORDERS) {
			let i = 0;
			let levelCount = 0;
			while (true) {
				const offset = (i * PAGE_SIZE).toString();
				let url = fetchUrl.url.replace('{ORDER}', order.param);

				if (fetchUrl.paged) {
					url = url.replace('{LIMIT}', limit).replace('{OFFSET}', offset);
				}

				const response = await fetch(url, {
					...FETCH_CONFIG,
					body: fetchUrl.body,
				});
				const data = await response.text();

				const pageLevelCount = JSON.parse(data).length;

				if (!pageLevelCount) {
					break;
				} else {
					levelCount += pageLevelCount;
					let fileName = `${fetchUrl.fileRoot}_order${order.key}`;
					if (fetchUrl.paged) {
						fileName += `_offset${offset}_limit${limit}`;
					}
					fileName += '.json';
					const destPath = path.resolve(process.cwd(), DEST_DIR, fileName);
					await fsp.writeFile(destPath, data);
					console.log('wrote', destPath);

					++i;
				}

				if (!fetchUrl.paged) {
					break;
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
