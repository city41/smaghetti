import { StaticResource } from './types';

const palette = [
	0x3ff,
	0x7fff,
	0x0,
	0x1a5f,
	0x233f,
	0x27df,
	0x1f,
	0x30e,
	0x0,
	0x0,
	0x0,
	0x0,
	0x0,
	0x0,
	0x0,
	0x732b,
];

const MarioLuigiLetterIcons: Record<string, StaticResource> = {
	MarioLetterIconActive: {
		romOffset: 0x239b70,
		palettes: [palette],
		tiles: [[23]],
	},
	MarioLetterIconInactive: {
		romOffset: 0x239b70,
		palettes: [palette],
		tiles: [[55]],
	},
	LuigiLetterIconActive: {
		romOffset: 0x239b70,
		palettes: [palette],
		tiles: [[24, 25]],
	},
	LuigiLetterIconInactive: {
		romOffset: 0x239b70,
		palettes: [palette],
		tiles: [[56, 57]],
	},
};

export { MarioLuigiLetterIcons };
