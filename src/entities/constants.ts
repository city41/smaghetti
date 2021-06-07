// bowser's graphic set is 0x16, and this causes
// some sprites to be garbled. They can avoid being in
// the same room as Bowser by using this in their last graphic set slot
export const ANY_BELOW_0x16 = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	0xa,
	0xb,
	0xc,
	0xd,
	0xe,
	0xf,
	0x10,
	0x11,
	0x12,
	0x13,
	0x14,
	0x15,
];

// for entities that don't care about sprite graphic sets
export const ANY_SPRITE_GRAPHIC_SET: [
	number,
	number,
	number,
	number,
	number,
	number
] = [-1, -1, -1, -1, -1, -1];

export const ANY_OBJECT_SET = [-1];
