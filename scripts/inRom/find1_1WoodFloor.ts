import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';

function isWoodFloor(data: Uint8Array, offset: number): boolean {
	if (data[offset + 3] === 0xb) {
		// const height = 0x2f & data[offset];
		// const y = data[offset + 1];
		const x = data[offset + 2];
		const width = data[offset + 4];

		return x === 0 && width === 38;
	}

	return false;
}

function main() {
	const romPath = process.argv[2];

	if (!romPath) {
		console.error('usage: node find1_1Pointers <path-to-rom>');
		process.exit(1);
	}

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));
	const romData = new Uint8Array(romBuffer);

	for (let i = 0; i < romData.length; ++i) {
		if (isWoodFloor(romData, i)) {
			const slice = romData.slice(i, i + 5);
			const bytes = Array.from(slice)
				.map((b) => b.toString(16))
				.join(',');

			console.log('possible wood floor at', i.toString(16), bytes);
		}
	}
}

main();
