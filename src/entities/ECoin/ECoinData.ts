const ECoinPaletteData = [
	0xf7,
	0x7f,
	0x8d,
	0x00,
	0xff,
	0x7f,
	0xff,
	0x5f,
	0xdf,
	0x17,
	0x7d,
	0x13,
	0xda,
	0x0e,
	0x57,
	0x0a,
	0xd5,
	0x05,
	0x53,
	0x05,
	0x19,
	0x12,
	0xff,
	0x1e,
	0x7f,
	0x27,
	0,
	0,
	0,
	0,
	0,
	0,
];

const ECoinPalette = ECoinPaletteData.reduce<number[]>((building, byte, i) => {
	if (i % 2 === 1) {
		return building;
	}

	return building.concat((ECoinPaletteData[i + 1] << 8) | byte);
}, []);

const ECoinTileData = [
	0x0,
	0x0,
	0x0,
	0x0,
	0x0,
	0x0,
	0x0,
	0x11,
	0x0,
	0x0,
	0x11,
	0x21,
	0x0,
	0x10,
	0x21,
	0x43,
	0x0,
	0x11,
	0x42,
	0x44,
	0x0,
	0x21,
	0x44,
	0x44,
	0x10,
	0x21,
	0x44,
	0x44,
	0x10,
	0x32,
	0x44,
	0x34,
	0x11,
	0x11,
	0x11,
	0x11,
	0x21,
	0x32,
	0x33,
	0x1c,
	0x32,
	0x44,
	0x44,
	0xc4,
	0x44,
	0x44,
	0x44,
	0x44,
	0x44,
	0x44,
	0x44,
	0x44,
	0x44,
	0x88,
	0x48,
	0x44,
	0x99,
	0x89,
	0x89,
	0x48,
	0x93,
	0x33,
	0x85,
	0x39,
	0x0,
	0x0,
	0x0,
	0x0,
	0x11,
	0x0,
	0x0,
	0x0,
	0x1b,
	0x11,
	0x0,
	0x0,
	0xb4,
	0x1b,
	0x1,
	0x0,
	0x44,
	0x44,
	0x11,
	0x0,
	0x44,
	0x44,
	0x1b,
	0x0,
	0x44,
	0x44,
	0x1b,
	0x1,
	0x48,
	0x44,
	0xbc,
	0x1,
	0x11,
	0x42,
	0x44,
	0x53,
	0x21,
	0x43,
	0x74,
	0x83,
	0x21,
	0x44,
	0x22,
	0x23,
	0xc1,
	0x54,
	0x22,
	0x23,
	0xc1,
	0x54,
	0x76,
	0x73,
	0xb1,
	0x44,
	0x55,
	0x73,
	0xb1,
	0x4c,
	0x54,
	0x73,
	0x11,
	0x4b,
	0x54,
	0x73,
	0x88,
	0x57,
	0x55,
	0x83,
	0x77,
	0x87,
	0x99,
	0x53,
	0x22,
	0x22,
	0x22,
	0x22,
	0x22,
	0x22,
	0x22,
	0x22,
	0x77,
	0x79,
	0x97,
	0x77,
	0x66,
	0x69,
	0x96,
	0x66,
	0x35,
	0x29,
	0x92,
	0x22,
	0x2c,
	0x22,
	0x22,
	0x22,
	0x98,
	0x44,
	0xb4,
	0x11,
	0x83,
	0x44,
	0xc4,
	0x1a,
	0x22,
	0x22,
	0x44,
	0x1a,
	0x22,
	0x22,
	0x45,
	0x1a,
	0x77,
	0x77,
	0x45,
	0x1a,
	0x99,
	0x67,
	0x44,
	0x1a,
	0x92,
	0x56,
	0x44,
	0x1a,
	0x77,
	0x45,
	0x64,
	0x11,
	0x10,
	0xcb,
	0x44,
	0x73,
	0x10,
	0xb1,
	0x44,
	0x53,
	0x0,
	0xb1,
	0x44,
	0x53,
	0x0,
	0x11,
	0x4b,
	0x53,
	0x0,
	0x10,
	0x31,
	0xcb,
	0x0,
	0x0,
	0x11,
	0xa1,
	0x0,
	0x0,
	0x0,
	0x11,
	0x0,
	0x0,
	0x0,
	0x0,
	0x26,
	0x22,
	0x22,
	0x22,
	0x77,
	0x99,
	0x99,
	0x79,
	0x55,
	0x55,
	0x55,
	0x55,
	0x44,
	0x44,
	0x44,
	0x44,
	0x44,
	0x44,
	0x44,
	0x44,
	0x6a,
	0x44,
	0x44,
	0xa6,
	0xa1,
	0xaa,
	0xaa,
	0x1a,
	0x11,
	0x11,
	0x11,
	0x11,
	0x67,
	0x44,
	0xa4,
	0x1,
	0x56,
	0x44,
	0x16,
	0x1,
	0x45,
	0x64,
	0x1a,
	0x0,
	0x44,
	0xa6,
	0x11,
	0x0,
	0xa6,
	0x1a,
	0x1,
	0x0,
	0x1a,
	0x11,
	0x0,
	0x0,
	0x11,
	0x0,
	0x0,
	0x0,
	0x0,
	0x0,
	0x0,
	0x0,
];

export { ECoinPaletteData, ECoinPalette, ECoinTileData };
export const ECoinData = ECoinPaletteData.concat(ECoinTileData);
