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

// setting a room's background is several settings that generally should be bundled
// together. It doesn't make sense to combine the cave background with the bgExtraColorAndEffect
// from fortress (which is columns further in the background) for example
export const ROOM_BACKGROUND_SETTINGS: Record<
	string,
	RoomBackgroundSettings
> = {
	underground: {
		// music: 0xd,
		bgGraphic: 0x37,
		bgColor: 0x1,
		bgExtraColorAndEffect: 0,
	},
	fortress: {
		// music: 0xf,
		bgGraphic: 0x6,
		bgColor: 0x98,
		// this is what adds the second layer of columns with parallax
		bgExtraColorAndEffect: 0x49,
	},
};
