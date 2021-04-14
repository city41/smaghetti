export const ROOM_OBJECT_HEADER_SIZE_IN_BYTES = 11;
export const POINTER_AREA_SIZE_IN_BYTES = 48;

type RoomIndex = 0 | 1 | 2 | 3;

export const ROOM_OBJECT_POINTERS: Record<RoomIndex, number> = {
	0: 0x5,
	1: 0x11,
	2: 0x1d,
	3: 0x29,
};

export const ROOM_LEVELSETTING_POINTERS: Record<RoomIndex, number> = {
	0: 0x7,
	1: 0x13,
	2: 0x1f,
	3: 0x2b,
};

export const ROOM_TRANSPORT_POINTERS: Record<RoomIndex, number> = {
	0: 0x9,
	1: 0x15,
	2: 0x21,
	3: 0x2d,
};

export const ROOM_SPRITE_POINTERS: Record<RoomIndex, number> = {
	0: 0xb,
	1: 0x17,
	2: 0x23,
	3: 0x2f,
};

export const ROOM_BLOCKPATH_POINTERS: Record<RoomIndex, number> = {
	0: 0xd,
	1: 0x19,
	2: 0x25,
	3: 0x31,
};

export const ROOM_AUTOSCROLL_POINTERS: Record<RoomIndex, number> = {
	0: 0xf,
	1: 0x1b,
	2: 0x27,
	3: 0x33,
};
