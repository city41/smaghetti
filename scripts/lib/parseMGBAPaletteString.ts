export function parseMGBAPaletteString(paletteStr: string): number[] {
	const chunks: string[] = [];

	for (let i = 0; i < paletteStr.length; i += 4) {
		chunks.push(paletteStr.substr(i, 4));
	}

	return chunks.map((c) => {
		const highByte = c.substr(2);
		const lowByte = c.substr(0, 2);

		return (parseInt(highByte, 16) << 8) | parseInt(lowByte, 16);
	});
}
