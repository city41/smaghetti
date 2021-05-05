// bowser's graphic set is 0x16, and this causes
// some sprites to be garbled. They can avoid being in
// the same room as Bowser by using this in their last graphic set slot
export const ANY_BELOW_16 = [
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
	10,
	11,
	12,
	13,
	14,
	15,
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