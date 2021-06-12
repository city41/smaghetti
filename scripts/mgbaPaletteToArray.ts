import 'ignore-styles';
import { parseMGBAPaletteString } from './lib/parseMGBAPaletteString';

const paletteStr = process.argv[2];

if (!paletteStr) {
	console.error('usage node mgbaPaletteToArray <mgba-palette-string>');
	process.exit(1);
}

function toHexString(v: number) {
	return `0x${v.toString(16)}`;
}

const values = parseMGBAPaletteString(paletteStr);

console.log('[', values.map(toHexString).join(', '), ']');
