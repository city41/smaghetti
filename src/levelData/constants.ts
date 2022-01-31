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
	Silence: 0x11,
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
	blank: 0x0,
	// 0x1 - underwater with added terrain (repeat of 0x21)
	'stormy-clouds': 0x2,
	'inside-airship': 0x3,
	'underground-cave': 0x4,
	plains: 0x5,
	fortress: 0x6,
	// 'outside-castle-wall': 0x7,
	winter: 0x8,
	'tall-hills-but-shorter': 0xa,
	// 0xb: underground (repeat)
	'green-mountains': 0xc,
	desert: 0xd,
	'hills-in-clouds': 0xf,
	pyramids: 0xe,
	// basement dungeon (repeat)
	mountains: 0x11,
	'high-up-in-the-clouds': 0x12,
	'bonus-room': 0x13,
	'crystal-underground': 0x14,
	// 0x15: underground (repeat)
	waterfalls: 0x16,
	'toad-house': 0x17,
	// 0x18: just the tips of some hills. mostly blank
	'pyramid-split-inside-and-out': 0x19,
	// 0x1a: plains (repeat)
	'bowser-castle': 0x1b,
	jungle: 0x1c,
	'hills-at-night': 0x1d,
	// 0x1e: up in the clouds of the waterfalls bg, but has some garbage tiles in it
	'basement-dungeon': 0x1f,
	'metal-brick': 0x20,
	'underwater-more-terrain': 0x21,
	// 0x22: bowser's castle, but its only about one screen wide
	// 0x23: stormy clouds (repeat)
	// 0x24: inside airship but with lots of garbled graphics
	underwater: 0x25,
	// 0x26: underwater but with only red plants and no wave effect
	'long-clouds': 0x27,
	'desert-brick-wall': 0x28,
	// 0x29: bowser's castle (repeat)
	'night-sky': 0x2a,
	// 0x2b: basement dungeon (repeat)
	'ghost-house': 0x2c,
	// 0x2d: a sparse ghost house, has beams and cobwebs but no windows
	'basic-castle': 0x2e,
	// 0x2f: looks to be mostly garbage, but some hints of clouds up high
	// 0x30: bonus game wall with embossed power ups, only one screen in size
	'colorful-brick-wall': 0x31,
	'blue-and-green-stars': 0x32,
	'tetris-room': 0x33,
	'underground-double-cave': 0x34,
	pipes: 0x35,
	'tall-hills': 0x36,
	underground: 0x37,
	// 0x38: hills in the clouds (repeat)
	'far-away-hills-in-clouds': 0x39,
	'stone-wall': 0x3a,
	// 0x3b: tall waterfalls, but the clouds above have some garbage tiles
	'large-pulsating-bricks': 0x3c,
	'jungle-no-sky': 0x3d,
	// 0x3e: repeat of 0x3b
	// 0x3f: more waterfalls, also with garbled sky tiles

	// 0x40 and greater all seem to crash the game
};

export const BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES: Record<
	BackgroundExtraColorAndEffect,
	number
> = {
	none: 0,
	'fortress-parallax': 0x49,
	'underwater-ripple-purple': 0x11,
	'stormy-clouds-lightning': 0x33,
	'lava-shimmer': 0x49,
};

export const ROOM_BACKGROUND_SETTINGS: Record<
	string,
	RoomBackgroundSettings
> = {
	blank: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.blank,
		bgColor: 0x0,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	underground: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.underground,
		bgColor: 0x1,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'underground-cave': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['underground-cave'],
		bgColor: 0x84,
		bgExtraColorAndEffect: 0x5a,
	},
	'underground-double-cave': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['underground-double-cave'],
		bgColor: 0x84,
		bgExtraColorAndEffect: 0x5a,
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
		bgColor: 0xc,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'long-clouds': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['long-clouds'],
		bgColor: 0xc,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'pyramid-split-inside-and-out': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['pyramid-split-inside-and-out'],
		bgColor: 0xc,
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
	'tall-hills-but-shorter': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['tall-hills-but-shorter'],
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
	'underwater-more-terrain': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['underwater-more-terrain'],
		bgColor: 0x9c,
		bgExtraColorAndEffect:
			BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES['underwater-ripple-purple'],
	},
	'crystal-underground': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['crystal-underground'],
		bgColor: 0x4,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'hills-at-night': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['hills-at-night'],
		bgColor: 0,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'night-sky': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['night-sky'],
		bgColor: 0x4,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'stormy-clouds': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['stormy-clouds'],
		bgColor: 0x74,
		bgExtraColorAndEffect:
			BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES['stormy-clouds-lightning'],
	},
	'stone-wall': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['stone-wall'],
		bgColor: 0x4,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'basement-dungeon': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['basement-dungeon'],
		bgColor: 0x1,
		bgExtraColorAndEffect:
			BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES['lava-shimmer'],
	},
	'large-pulsating-bricks': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['large-pulsating-bricks'],
		bgColor: 0x1,
		bgExtraColorAndEffect:
			BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES['lava-shimmer'],
	},
	pyramids: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['pyramids'],
		bgColor: 0xc,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'inside-airship': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['inside-airship'],
		bgColor: 0x1,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	mountains: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.mountains,
		bgColor: 0x14,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'high-up-in-the-clouds': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['high-up-in-the-clouds'],
		bgColor: 0x84,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	waterfalls: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.waterfalls,
		bgColor: 0x98,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
		// this byte causes the strip of water to not be added to the level
		// so far unable to use that strip, it always shows up invisible
		unknownThirdHeaderByte: 0xa,
	},
	'bowser-castle': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['bowser-castle'],
		bgColor: 0x0,
		bgExtraColorAndEffect: 0x9f,
	},
	'basic-castle': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['basic-castle'],
		bgColor: 0x0,
		bgExtraColorAndEffect: 0x9f,
	},
	pipes: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.pipes,
		bgColor: 0x0,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'green-mountains': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['green-mountains'],
		bgColor: 0x4,
		bgExtraColorAndEffect: 0,
	},
	'hills-in-clouds': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['hills-in-clouds'],
		bgColor: 0x98,
		bgExtraColorAndEffect: 0x22,
	},
	'far-away-hills-in-clouds': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['far-away-hills-in-clouds'],
		bgColor: 0x98,
		bgExtraColorAndEffect: 0,
	},
	jungle: {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.jungle,
		bgColor: 0x0,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'toad-house': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['toad-house'],
		bgColor: 0x0,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'desert-brick-wall': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['desert-brick-wall'],
		bgColor: 0x0,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'colorful-brick-wall': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['colorful-brick-wall'],
		bgColor: 0x0,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'blue-and-green-stars': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['blue-and-green-stars'],
		bgColor: 0x0,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	'jungle-no-sky': {
		bgGraphic: BACKGROUND_GRAPHIC_VALUES['jungle-no-sky'],
		bgColor: 0x0,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
};
