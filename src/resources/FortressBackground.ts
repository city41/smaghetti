import { StaticResource } from './types';

const FortressBackground: StaticResource = {
	firstColorOpaque: true,
	// this palette was manually altered so that index zero is black
	palette: [
		0,
		0x7fff,
		0x0,
		0x39ce,
		0x4a52,
		0x6318,
		0x77bd,
		0x732c,
		0x7fd2,
		0x7ffb,
		0x5810,
		0x7597,
		0x7e1d,
		0x0,
		0x0,
		0x0,
	],
	romOffset: 0x186788,
	tiles: [[498, 498, 498, 498, 498, 498, 498, 43, 59]],
};

export { FortressBackground };
