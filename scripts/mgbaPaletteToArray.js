const paletteStr = process.argv[2];

if (!paletteStr) {
	console.error('usage node mgbaPaletteToArray <mgba-palette-string>');
	process.exit(1);
}

function toHexString(v) {
	return `0x${v.toString(16)}`;
}

const chunks = [];

for (let i = 0; i < paletteStr.length; i += 4) {
	chunks.push(paletteStr.substr(i, 4));
}

const values = chunks.map((c) => {
	const highByte = c.substr(2);
	const lowByte = c.substr(0, 2);

	return (parseInt(highByte, 16) << 8) | parseInt(lowByte, 16);
});

console.log('[', values.map(toHexString).join(', '), ']');
