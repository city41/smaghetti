import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';
// @ts-ignore no types
import sha1 from 'js-sha1';
import * as mkdirp from 'mkdirp';
import { execSync } from 'child_process';

type Result = Map<string, { image: string; sets: string[] }>;

function dedupe(dirPath: string, filePaths: string[]): Result {
	const result: Result = new Map();

	filePaths.forEach((filePath) => {
		const fullPath = path.join(dirPath, filePath);
		const buffer = fs.readFileSync(fullPath);
		const sha = sha1(buffer);
		const entry = result.get(sha) ?? { image: fullPath, sets: [] };
		entry.sets.push(path.basename(filePath));
		result.set(sha, entry);
	});

	return result;
}

const HTML_TEMPLATE = `
<!doctype html>
<html lang="en">
<head>
	<title>results</title>
</head>
<style>
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	
	li {
		margin: 0;
	}
	
	.entry {
		margin: 8px;
		border-right: 1px solid #ccc;
	}
</style>
<body>
	<h1>UNIQUE_RESULT_COUNT unique results</h1>
	<div style="display: flex; flex-direction: row">
		RESULT_ENTRIES
	</div>
</body>
</html>`;

const ENTRY_TEMPLATE = `<div class="entry">
<img width="240" height="160" src="IMG_SRC" />
<ul>
	ENTRY_LIS
</ul>
</div>`;

function toHtml(result: Result): string {
	const entries: string[] = [];

	result.forEach((r) => {
		const lis = r.sets
			.map((s) => `<li>${s.replace('.png', '')},</li>`)
			.join('\n');
		entries.push(
			ENTRY_TEMPLATE.replace('IMG_SRC', `file://${r.image}`).replace(
				'ENTRY_LIS',
				lis
			)
		);
	});

	return HTML_TEMPLATE.replace(
		'UNIQUE_RESULT_COUNT',
		result.size.toString()
	).replace('RESULT_ENTRIES', entries.join('\n'));
}

function main() {
	const dirArg = process.argv[2];

	if (!dirArg) {
		console.error('usage: node toHtmlResults <directory>');
		process.exit(1);
	}

	const dirPath = path.resolve(process.cwd(), dirArg);

	const files = fs.readdirSync(dirPath).filter((f) => {
		return f.endsWith('.png');
	});

	const result = dedupe(dirPath, files);

	const html = toHtml(result);

	const htmlDirPath = path.join(dirPath, 'results');
	mkdirp.sync(htmlDirPath);
	const htmlPath = path.join(htmlDirPath, 'index.html');

	fs.writeFileSync(htmlPath, html);

	execSync(`xdg-open ${htmlPath}`);
}

main();
