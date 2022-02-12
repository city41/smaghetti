import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';

function main() {
	const romPath = process.argv[2];
	const offsetS = process.argv[3];
	const countS = process.argv[4];

	if (!romPath || !offsetS || !countS) {
		console.error(
			`usage: ${path.basename(process.argv[0])} ${path.basename(
				process.argv[1]
			)} <path-to-rom> <offset> <count>`
		);
		process.exit(1);
	}

	const offset = parseInt(offsetS, 16);
	const count = parseInt(countS, 10);

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));
	const romData = new Uint8Array(romBuffer);

	const slice = romData.slice(offset, offset + count);

	console.log(
		Array.from(slice)
			.map((b) => b.toString(16))
			.join(' ')
	);
}

main();
