import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';

function isBytes(
	data: Uint8Array,
	offset: number,
	spriteBytes: Array<[number, number]>
): boolean {
	return spriteBytes.every((sb, i) => {
		const val = data[offset + i];

		return sb[0] <= val && sb[1] >= val;
	});
}

function usage() {
	console.error(
		`\nusage: ${path.basename(process.argv[0])} ${path.basename(
			process.argv[1]
		)} <path-to-rom> '<byte-string>'`
	);
	console.error(
		'(dont forget to wrap the byte string in quotes to make it one param)\n'
	);
	process.exit(1);
}

function main() {
	if (process.argv.length > 4) {
		usage();
	}

	const romPath = process.argv[2];
	const byteString = process.argv[3];

	if (!romPath || !byteString) {
		usage();
	}

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));
	const romData = new Uint8Array(romBuffer);
	const bytes: Array<[number, number]> = byteString
		.split(' ')
		.reduce<Array<[number, number]>>((building, bs) => {
			if (bs === '?') {
				return building.concat([[0, 256]]);
			} else if (bs.endsWith('?')) {
				const repeat = parseInt(bs, 10);

				if (isNaN(repeat)) {
					console.error('Unknown byte pattern found', bs);
					process.exit(1);
				}

				const bytes: Array<[number, number]> = [];
				for (let i = 0; i < repeat; ++i) {
					bytes.push([0, 256]);
				}

				return building.concat(bytes);
			} else if (bs.includes('-')) {
				const splits = bs.split('-');
				return building.concat([
					[parseInt(splits[0], 16), parseInt(splits[1], 16)],
				]);
			} else {
				return building.concat([[parseInt(bs, 16), parseInt(bs, 16)]]);
			}
		}, []);

	for (let i = 0; i < romData.length; ++i) {
		if (isBytes(romData, i, bytes)) {
			const slice = romData.slice(i, i + bytes.length);
			const foundBytes = Array.from(slice)
				.map((b) => b.toString(16))
				.join(',');

			console.log('match at', i.toString(16), foundBytes);
		}
	}
}

main();
