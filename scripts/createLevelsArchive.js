const path = require('node:path');
const fsp = require('node:fs/promises');

const SUPABASE_ROOT = 'https://cfmypkasixjnpkxfpylf.supabase.co/rest/v1/rpc/';

const FETCH_URLS = [
	{
		fileRoot: 'get_all_published_levels',
		url: `${SUPABASE_ROOT}get_all_published_levels?offset={OFFSET}&limit={LIMIT}&order={ORDER}`,
		paged: true,
		body: '{"current_user_id":""}',
		tags: [''],
	},
	{
		fileRoot: 'get_published_levels_that_have_special_coins',
		url: `${SUPABASE_ROOT}get_published_levels_that_have_special_coins?offset={OFFSET}&limit={LIMIT}&order={ORDER}`,
		paged: true,
		body: '{"current_user_id":""}',
		tags: [''],
	},
	{
		fileRoot: 'get_published_levels_that_have_ecoins',
		url: `${SUPABASE_ROOT}get_published_levels_that_have_ecoins?order={ORDER}`,
		paged: false,
		body: '',
		tags: [''],
	},
	{
		fileRoot: 'get_published_levels_with_tags',
		url: `${SUPABASE_ROOT}get_published_levels_with_tags?offset={OFFSET}&limit={LIMIT}&order={ORDER}`,
		paged: true,
		body: '{"current_user_id":"", "matching_tags": ["{TAG}"]}',
		tags: [
			'traditional',
			'classic',
			'adventure',
			'kaizo',
			'experimental',
			'difficult',
			'easy',
			'troll',
			'puzzle',
			'speed run',
			'casual',
			'tutorial',
		],
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

async function getMainPublishedLevels() {
	const fetch = (await import('node-fetch')).default;
	const limit = PAGE_SIZE.toString();

	const creators = new Set();

	for (const fetchUrl of FETCH_URLS) {
		for (const order of ORDERS) {
			for (const tag of fetchUrl.tags) {
				let i = 0;
				let levelCount = 0;
				while (true) {
					const offset = (i * PAGE_SIZE).toString();
					let url = fetchUrl.url.replace('{ORDER}', order.param);

					if (fetchUrl.paged) {
						url = url.replace('{LIMIT}', limit).replace('{OFFSET}', offset);
					}

					const body = fetchUrl.body.replace('{TAG}', tag);
					const fetchConfig = { ...FETCH_CONFIG, body };

					const response = await fetch(url, fetchConfig);
					const data = await response.text();
					const parsedData = JSON.parse(data);

					const pageLevelCount = parsedData.length;

					parsedData.forEach((l) => {
						creators.add(l.username);
					});

					if (pageLevelCount === 0) {
						break;
					} else {
						levelCount += pageLevelCount;
						let fileName = `${fetchUrl.fileRoot}_order${order.key}`;
						if (fetchUrl.paged) {
							fileName += `_offset${offset}_limit${limit}`;
						}

						if (tag) {
							fileName += `_tag${tag}`;
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

				console.log({ fetchUrl, order, tag, levelCount });
			}
		}
	}

	return Array.from(creators);
}

async function getCreatorPages(creators) {
	const fetch = (await import('node-fetch')).default;
	const URL_TEMPLATE =
		'https://cfmypkasixjnpkxfpylf.supabase.co/rest/v1/levels?select=*%2Cuser%3Auser_id%21inner%28username%29&published=eq.true&order=updated_at.desc.nullslast&limit=2000&user.username=eq.{CREATOR}';

	for (const creator of creators) {
		const url = URL_TEMPLATE.replace('{CREATOR}', creator);
		const fileName = `creator_levels_${creator}.json`;

		const response = await fetch(url, { ...FETCH_CONFIG, method: 'GET' });
		const data = await response.text();

		const destPath = path.resolve(process.cwd(), DEST_DIR, fileName);
		await fsp.writeFile(destPath, data);
		console.log('wrote', destPath);
	}
}

async function main() {
	const creators = await getMainPublishedLevels();
	await getCreatorPages(creators);
}

main()
	.then(() => {
		console.log('done');
	})
	.catch((e) => {
		console.error(e);
	});
