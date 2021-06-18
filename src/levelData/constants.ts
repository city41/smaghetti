export const ROOM_OBJECT_HEADER_SIZE_IN_BYTES = 11;
export const POINTER_AREA_SIZE_IN_BYTES = 48;
export const ROOM_LEVELSETTINGS_SIZE_IN_BYTES = 32;

// these are simple arrays because there are four rooms,
// so index 0 is room zero's pointer address

export const ROOM_OBJECT_POINTERS = [0x5, 0x11, 0x1d, 0x29];

export const ROOM_LEVELSETTING_POINTERS = [0x7, 0x13, 0x1f, 0x2b];

export const ROOM_TRANSPORT_POINTERS = [0x9, 0x15, 0x21, 0x2d];

export const ROOM_SPRITE_POINTERS = [0xb, 0x17, 0x23, 0x2f];

export const ROOM_BLOCKPATH_POINTERS = [0xd, 0x19, 0x25, 0x31];

export const ROOM_AUTOSCROLL_POINTERS = [0xf, 0x1b, 0x27, 0x33];

export const MUSIC_VALUES: Record<MusicTrack, number> = {
	Plains: 0x0,
	'Underground/Bonus': 0x1,
	Underwater: 0x2,
	Fortress: 0x3,
	'Boss Battle': 0x4,
	Airship: 0x5,
	'Hammer bros': 0x6,
	'Mushroom House': 0x7,
	Athletic: 0x8,
	'Castle room': 0x9,
	Sky: 0xa,
	Underground: 0xb,
	'Classic Plains': 0xc,
	'Classic Underground': 0xd,
	'Classic Underwater': 0xe,
	'Classic Castle': 0xf,
	'Ghost House': 0x10,
	'Game Select Menu': 0x14,
	'Bonus Room': 0x1b,
	Credits: 0x27,
	'e-Reader Connect Screen': 0x2b,
	'Game Over': 0x2e,
	'SMW P-Switch Music': 0x2f,
	'Music Box': 0x37,
	'Level Finished': 0x3a,
	'World 5 Map': 0x3e,
	'World 8 Map': 0x3f,
};

export const BACKGROUND_GRAPHIC_VALUES: Record<BackgroundGraphic, number> = {
	underground: 0x37,
	fortress: 0x6,
	plains: 0x5,
	desert: 0xd,
	'ghost-house': 0x2c,
	'bonus-room': 0x13,
	'tetris-room': 0x33,
	'tall-hills': 0x36,
	'metal-brick': 0x20,
	winter: 0x8,
	underwater: 0x25,
	'crystal-underground': 0x14,
	'hills-at-night': 0x1d,
};

export const BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES: Record<
	BackgroundExtraColorAndEffect,
	number
> = {
	none: 0,
	'fortress-parallax': 0x49,
	'underwater-ripple-purple': 0x11,
};

// setting a room's background is several settings that generally should be bundled
// together. It doesn't make sense to combine the cave background with the bgExtraColorAndEffect
// from fortress (which is columns further in the background) for example
export const ROOM_BACKGROUND_SETTINGS: Record<
	string,
	RoomBackgroundSettings
> = {
	underground: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.underground,
		bgColor: 0x1,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	fortress: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.fortress,
		bgColor: 0x98,
		bgExtraColorAndEffect:
			BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES['fortress-parallax'],
	},
	plains: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.plains,
		bgColor: 0x84,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	desert: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.desert,
		bgColor: 0xf,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'ghost-house': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['ghost-house'],
		bgColor: 0x1,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'bonus-room': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['bonus-room'],
		bgColor: 0x4,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'tetris-room': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['tetris-room'],
		bgColor: 0x4,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'tall-hills': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['tall-hills'],
		bgColor: 0x84,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'metal-brick': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['metal-brick'],
		bgColor: 0x4,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	winter: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.winter,
		bgColor: 0x84,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	underwater: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.underwater,
		bgColor: 0x9c,
		bgExtraColorAndEffect:
			BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES['underwater-ripple-purple'],
	},
	'crystal-underground': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['crystal-underground'],
		bgColor: 0x2,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'hills-at-night': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['hills-at-night'],
		bgColor: 0x2,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
};
