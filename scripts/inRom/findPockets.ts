import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';

function usage() {
	console.error(
		`\nusage: ${path.basename(process.argv[0])} ${path.basename(
			process.argv[1]
		)} <path-to-rom> '<offset in hex>'`
	);
	process.exit(1);
}

function findPockets(data: number[], offset: number) {
	data = data.slice(offset);

	let i = 0;

	while (i < data.length) {
		const firstNonZero = data.findIndex(
			(b, bi, a) => bi === a.length - 1 || (bi >= i && b !== 0)
		);
		const firstFollowingZero = data.findIndex(
			(b, bi, a) =>
				bi === a.length - 1 ||
				(bi > firstNonZero && b === 0 && a[bi + 1] === 0 && a[bi + 1] === 0)
		);

		if (firstNonZero < firstFollowingZero) {
			console.log(
				'bytes at',
				(offset + firstNonZero).toString(16),
				'size',
				firstFollowingZero - firstNonZero
			);
		}

		i = firstFollowingZero + 1;
	}
}

function main() {
	if (process.argv.length > 4) {
		usage();
	}

	const romPath = process.argv[2];
	const offset = parseInt(process.argv[3], 16);

	if (!romPath || isNaN(offset)) {
		usage();
	}

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));

	findPockets(Array.from(romBuffer), offset);
}

main();
