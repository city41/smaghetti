type InGameLevel = {
	name?: string;
	root?: number;
	sprites?: number;
};

const potentialSpriteStarts = [
	// 0x157039,
	// 0x15703f,
	0x1571e6,
	0x157200,
	0x1572ad,
	// 0x157350,
	// 0x157360,
	0x157371,
	0x157451,
	// 0x157498,
	0x1574a8,
	0x157528,
	// 0x1575b7,
	0x1575ce,
	// 0x157646,
	// 0x15784b,
	0x15789b,
	0x1578c7,
	0x157933,
	0x157966,
	0x1579e5,
	0x157b1d,
	0x157dad,
	0x157e23,
	0x157ec9,
	// 0x157ee9,
	// 0x157f0f,
	// 0x157f2f,
	// 0x157f49,
	0x157f81,
	0x15809d,
	0x1580e7,
	// 0x15813b
	0x15828d,
	0x1582ef,
	// 0x158409,
	0x15841d,
	0x15848b,
	0x158518,
	0x1585bb,
	// 0x158641,
	0x158655,
	// 0x158687,
	// 0x15869b,
	0x1586bd,
	0x1586d3,
	0x1586ef,
	0x15875d,
	0x1587bf,
	// 0x1588a7,
	// 0x1588d3,
	0x1588ed,
	0x158965,
	0x158a1a,
	0x158a38,
	// 0x158a74,
	// 0x158a88,
	0x158aac,
	0x158b8c,
	0x158b92,
	0x158c94,
	0x158d24,
	0x158d8a,
	0x158de6,
	0x158e04,
	0x158e0a,
	// 0x158e16,
	0x158e21,
	0x158ea3,
	0x158ec1,
	0x158ecf,
	0x158f88,
	0x158fd5,
	0x158ff7,
	// 0x159055,
	// 0x159060,
	0x159082,
	0x1590f8,
	0x15911e,
	0x159173,
	0x1591a6,
	0x1591c8,
	0x1591e9,
	0x159203,
	0x159213,
	0x159263,
	0x15929f,
	0x1592f8,
	0x1593ea,
	// 0x1594c4,
	// 0x1594ca,
	// 0x1598c2,
	// 0x159902,
	// 0x159908,
	// 0x15990e,
	0x159914,
	// 0x159962,
	// 0x159b02,
	// 0x159ee2,
	// 0x159eea,
	// 0x159ef2,
	// 0x15a20d,
	// 0x15a6b8,
	// 0x15b013,
	// 0x15b058,
	// 0x15b06b,
	// 0x15b075,
	// 0x15b089,
	// 0x15b095,
	// 0x15b0a1,
	// 0x15b0a9,
	// 0x15b0b7,
	// 0x15b7b2,
	// 0x15ca01,
	// 0x15cac3,
	// 0x15cb19,
	// 0x15cb30,
];

const inGameLevels: InGameLevel[] = [
	{
		root: 0x1408c7,
		name: '1-1',
		sprites: 0x157811,
	},
	{ root: 0x141db8, name: '1-2', sprites: 0x157a93 },
	{ root: 0x13f7da, name: '1-3' },
	{ root: 0x145b80, name: '1-4' },
	{ root: 0x1432b4, name: '1-5', sprites: 0x157e5d },
	{ root: 0x145a11, name: '1-6' },
	{ root: 0x14a99b, name: '1-Fortress' },
	{ root: 0x14c9a2, name: '1-Airship' },
	{ root: 0x140a24, name: '1-1 Bonus Area' },
	{ root: 0x140690, name: '1-2 Bonus Area' },
	{ root: 0x14841d, name: '1-3 Bonus Area' },
	{ root: 0x140cbc, name: '1-4 Ending' },
	{ root: 0x14883f, name: '1-5 Bonus Area' },
	{
		root: 0x140b6c,
		name: '1-5 Ending, 5-2 Ending, 5-3 Ending',
	},
	{ root: 0x14aaac, name: '1-Fortress Spike Room' },
	{ root: 0x14d9be, name: '1-Airship Boss Room' },
	{ root: 0x142362, name: '1-Hammer Bros. 1' },
	{ root: 0x142383, name: '1-Hammer Bros. 2' },
	{ root: 0x14a824, name: '1-Castle Room' },
	{ root: 0x14c7c8, name: '1-Anchors Away' },
	{ root: 0x14dac2, name: 'Coin Ship' },
	{ root: 0x14db9d, name: 'Coin Ship Boss Room' },
	{ root: 0x1498d2, name: '2-1', sprites: 0x158c0c },
	{ root: 0x142991, name: '2-2' },
	{ root: 0x149dc3, name: '2-3' },
	{ root: 0x14a247, name: '2-4' },
	{
		root: 0x149b7a,
		name: '2-5',

		sprites: 0x158c56,
	},
	{ root: 0x149fdf, name: '2-Fortress' },
	{
		root: 0x1425e8,
		name: '2-Desert',

		sprites: 0x157cd7,
	},
	{ root: 0x140f04, name: '2-Pyramid' },
	{ root: 0x14cae6, name: '2-Airship' },
	{ root: 0x149aaa, name: '2-1 Bonus Area' },
	{ root: 0x14a580, name: '2-2 Ending' },
	{ root: 0x14a594, name: '2-3 Ending' },
	{ root: 0x149d0b, name: '2-5 Bonus Area' },
	{ root: 0x14a1a3, name: '2-Fortress Spike Room' },
	{ root: 0x1491ac, name: '2-Pyramid Outside' },
	{ root: 0x14d9de, name: '2-Airship Boss Room' },
	{ root: 0x1495b2, name: '2-Hammer Bros.' },
	{ root: 0x14a7c0, name: '2-Castle Room' },
	{ root: 0x14c788, name: '2-Anchors Away' },
	{ root: 0x14717f, name: '3-1' },
	{ root: 0x144c93, name: '3-2' },
	{ root: 0x140cf2, name: '3-3' },
	{ root: 0x144689, name: '3-4' },
	{ root: 0x146e32, name: '3-5' },
	{ root: 0x144e48, name: '3-6' },
	{ root: 0x140526, name: '3-7' },
	{ root: 0x143567, name: '3-8' },
	{ root: 0x13fb9a, name: '3-9' },
	{ root: 0x14ac78, name: '3-Fortress 1' },
	{ root: 0x14ab15, name: '3-Fortress 2' },
	{ root: 0x14ccb4, name: '3-Airship' },
	{ root: 0x140673, name: '3-1 Ending, 7-2 Ending' },
	{ root: 0x144db7, name: '3-2 Ending' },
	{ root: 0x140e53, name: '3-3 Ending' },
	{ root: 0x13f921, name: '3-5 Ending' },
	{ root: 0x144f50, name: '3-6 Ending' },
	{ root: 0x147b11, name: '3-7 Bonus Area' },
	{ root: 0x140b24, name: '3-8 Ending' },
	{ root: 0x143daa, name: '3-9 Bonus Area' },
	{ root: 0x13fe12, name: '3-9 Ending' },
	{ root: 0x14ad72, name: '3-Fortress 1 Water Room' },
	{ root: 0x14abe2, name: '3-Fortress 2 Water Room' },
	{ root: 0x14da0a, name: '3-Airship Boss Room' },
	{ root: 0x13fef9, name: '3-Hammer Bros. 1' },
	{ root: 0x13ff1a, name: '3-Hammer Bros. 2' },
	{ root: 0x140c2c, name: '3-Hammer Bros. 3' },
	{ root: 0x140c51, name: '3-Hammer Bros. 4' },
	{ root: 0x14a7d4, name: '3-Castle Room' },
	{ root: 0x14c7a8, name: '3-Anchors Away' },
	{ root: 0x147b42, name: '4-1' },
	{ root: 0x147f8c, name: '4-2' },
	{ root: 0x142707, name: '4-3' },
	{ root: 0x1481d7, name: '4-4' },
	{ root: 0x148686, name: '4-5' },
	{ root: 0x13f434, name: '4-6' },
	{ root: 0x14ba92, name: '4-Fortress 1' },
	{ root: 0x14b979, name: '4-Fortress 2' },
	{ root: 0x14ce4b, name: '4-Airship' },
	{ root: 0x148918, name: '4-1 Bonus Area' },
	{
		root: 0x140bcb,
		name: '4-1 Ending, 4-2 Ending, 4-3 Ending, 4-4 Ending, 4-5 Ending',
	},
	{ root: 0x147f1c, name: '4-3 Beginning' },
	{ root: 0x14075e, name: '4-4 Bonus Area' },
	{ root: 0x13f962, name: '4-5 Bonus Area' },
	{ root: 0x13f18c, name: '4-6 Small Side' },
	{ root: 0x143c13, name: '4-Fortress 1 Underground Room' },
	{ root: 0x1470b7, name: '4-Fortress 2 Pipe Room' },
	{ root: 0x143fda, name: '4-Fortress 2 Bonus Room' },
	{ root: 0x14c7e8, name: '4-Airship Boss Room' },
	{ root: 0x148fe7, name: '4-Hammer Bros.' },
	{ root: 0x14a7e8, name: '4-Castle Room' },
	{ root: 0x14d22b, name: '4-Anchors Away' },
	{ root: 0x13ff57, name: '5-1' },
	{ root: 0x142cea, name: '5-2' },
	{ root: 0x13f581, name: '5-3' },
	{ root: 0x1489e7, name: '5-4' },
	{ root: 0x14550f, name: '5-5' },
	{ root: 0x1480b9, name: '5-6' },
	{ root: 0x147dee, name: '5-7' },
	{ root: 0x147a90, name: '5-8' },
	{ root: 0x1481b7, name: '5-9' },
	{ root: 0x14ae91, name: '5-Fortress 1' },
	{ root: 0x14b7d5, name: '5-Tower Part 1' },
	{ root: 0x14b8ad, name: '5-Tower Part 2' },
	{ root: 0x14a8bb, name: '5-Fortress 2' },
	{ root: 0x14c82c, name: '5-Airship' },
	{ root: 0x140185, name: '5-1 Bonus Area' },
	{ root: 0x141209, name: '5-2 Bonus Area, 5-5 Bonus Area' },
	{ root: 0x147370, name: '5-2 Pipe Room' },
	{
		root: 0x13f3c0,
		name: '5-4 Ending, 5-6 Ending, 5-8 Ending, 5-9 Ending',
	},
	{ root: 0x13ed58, name: '5-7 Bonus Area' },
	{ root: 0x14b083, name: '5-Fortress 1 Bonus Area' },
	{ root: 0x148576, name: '5-Tower Outside Part 1' },
	{ root: 0x14852e, name: '5-Tower Outside Part 2' },
	{ root: 0x1484f6, name: '5-Tower Going Down' },
	{ root: 0x14a84c, name: '5-Fortress 2 Beginning/End' },
	{ root: 0x14da36, name: '5-Airship Boss Room' },
	{ root: 0x141a02, name: '5-Hammer Bros. 1' },
	{ root: 0x1423a8, name: '5-Hammer Bros. 2' },
	{ root: 0x148961, name: '5-Hammer Bros. 3' },
	{ root: 0x149034, name: '5-Hammer Bros. 4' },
	{ root: 0x14a7fc, name: '5-Castle Room' },
	{ root: 0x14d24b, name: '5-Anchors Away' },
	{ root: 0x145870, name: '6-1' },
	{ root: 0x145738, name: '6-2' },
	{ root: 0x144f8b, name: '6-3' },
	{ root: 0x145c88, name: '6-4' },
	{ root: 0x141354, name: '6-5' },
	{ root: 0x141a3d, name: '6-6' },
	{ root: 0x1461b8, name: '6-7' },
	{ root: 0x14489f, name: '6-8' },
	{ root: 0x141610, name: '6-9' },
	{ root: 0x146028, name: '6-10' },
	{ root: 0x14b3d6, name: '6-Fortress 1' },
	{ root: 0x1450cb, name: '6-Fortress 2' },
	{ root: 0x14b28d, name: '6-Fortress 3' },
	{ root: 0x14d03d, name: '6-Airship' },
	{ root: 0x146641, name: '6-1 Bonus Area' },
	{ root: 0x1459bf, name: '6-2 Ending' },
	{
		root: 0x1441f5,
		name: '6-3 Bonus Area, 6-9 Bonus Area, 6-10 Bonus Area',
	},
	{ root: 0x14880a, name: '6-4 Bonus Area' },
	{ root: 0x1452b3, name: '6-5 Outside Area' },
	{ root: 0x145fb3, name: '6-6 Outside Area' },
	{ root: 0x1463d0, name: '6-7 Ending' },
	{ root: 0x146421, name: '6-9 Outside Area' },
	{ root: 0x14b4be, name: '6-Fortress 1 Spike Room' },
	{ root: 0x14522f, name: '6-Fortress 2 Boss Room' },
	{ root: 0x14b3b5, name: '6-Fortress 3 Falling Room' },
	{ root: 0x14da5a, name: '6-Airship Boss Room' },
	{ root: 0x146629, name: '6-Hammer Bros. 1' },
	{ root: 0x1466b9, name: '6-Hammer Bros. 2' },
	{ root: 0x14a810, name: '6-Castle Room' },
	{ root: 0x14d26b, name: '6-Anchors Away' },
	{ root: 0x146870, name: '7-1' },
	{ root: 0x1492f0, name: '7-2' },
	{ root: 0x142190, name: '7-3' },
	{ root: 0x146bb0, name: '7-4' },
	{ root: 0x13ee5c, name: '7-5' },
	{ root: 0x1475e1, name: '7-6', sprites: 0x15869b },
	{ root: 0x14647e, name: '7-7' },
	{ root: 0x13f9d7, name: '7-8' },
	{ root: 0x1495fe, name: '7-9' },
	{ root: 0x148bb9, name: '7-Piranha Plant 1' },
	{ root: 0x14b57b, name: '7-Fortress 1' },
	{ root: 0x14b0f6, name: '7-Fortress 2' },
	{ root: 0x148a59, name: '7-Piranha Plant 2' },
	{ root: 0x14d2ab, name: '7-Airship' },
	{ root: 0x13f374, name: '7-1 Outside Area' },
	{ root: 0x13fe87, name: '7-4 Outside Area' },
	{ root: 0x140ad8, name: '7-5 Outside Area' },
	{ root: 0x13fe33, name: '7-6 Outside Area' },
	{ root: 0x13f3dd, name: '7-7 Beginning/End' },
	{ root: 0x148fff, name: '7-8 Bonus Area 1' },
	{
		root: 0x144440,
		name: '7-8 Bonus Area 2, 7-Fortress 1 Bonus Area',
	},
	{ root: 0x1492dc, name: '7-9 Ending' },
	{ root: 0x148e77, name: '7-Piranha Plant 1 Ending' },
	{ root: 0x14b716, name: '7-Fortress 1 Lonely Room' },
	{ root: 0x14b220, name: '7-Fortress 2 Boss Room' },
	{ root: 0x148e77, name: '7-Piranha Plant 2 Ending' },
	{ root: 0x14da8a, name: '7-Airship Boss Room' },
	{ root: 0x13ff38, name: '7-Hammer Bros.' },
	{ root: 0x14a838, name: '7-Castle Room' },
	{ root: 0x14d28b, name: '7-Anchors Away' },
	{ root: 0x1403a1, name: '8-1' },
	{ root: 0x143009, name: '8-2' },
	{ root: 0x14d859, name: '8-Tanks 1' },
	{ root: 0x14d56c, name: '8-Battleship' },
	{ root: 0x148d28, name: '8-Hand Trap 1' },
	{ root: 0x148ca9, name: '8-Hand Trap 2' },
	{ root: 0x148d8d, name: '8-Hand Trap 3' },
	{ root: 0x14d4b9, name: '8-Air Force' },
	{ root: 0x14bca9, name: '8-Fortress' },
	{ root: 0x14d6f2, name: '8-Tanks 2' },
	{ root: 0x14c19d, name: "8-Bowser's Castle" },
	{ root: 0x1441f5, name: '8-1 Bonus Area' },
	{ root: 0x140210, name: '8-2 Bonus Area' },
	{ root: 0x14dc95, name: '8-Tanks 1 Boss Room' },
	{ root: 0x14dbd5, name: '8-Battleship Boss Room' },
	{ root: 0x148e3f, name: '8-Hand Trap Ending' },
	{ root: 0x14dc55, name: '8-Air Force Boss Room' },
	{ root: 0x14bfb7, name: '8-Fortress Back Side' },
	{ root: 0x14dbd5, name: '8-Tanks 2 Boss Room' },
	{ root: 0x14c448, name: "8-Bowser's Lair" },
	{ root: 0x1436f9, name: 'Pipe 1 (forward)' },
	{ root: 0x143765, name: 'Pipe 1 (backward)' },
	{ root: 0x1438df, name: 'Pipe 2 (forward)' },
	{ root: 0x143a35, name: 'Pipe 2 (backward)' },
	{ root: 0x1437d1, name: 'Pipe 3 (forward)' },
	{ root: 0x143858, name: 'Pipe 3 (backward)' },
	{ root: 0x1438df, name: 'Pipe 4 (forward)' },
	{ root: 0x143946, name: 'Pipe 4 (backward)' },
	{ root: 0x143abd, name: 'Pipe 5 (forward)' },
	{ root: 0x143b14, name: 'Pipe 5 (backward)' },
	{ root: 0x143b6b, name: 'Pipe 6 (forward)' },
	{ root: 0x143bbf, name: 'Pipe 6 (backward)' },
	{
		name: '3-2castle: room 1',

		sprites: 0x158f5d,
	},
	{
		name: '3-2castle: room 2 (stretch boos)',

		sprites: 0x158f23,
	},
	{
		name: '3-7',

		sprites: 0x157711,
	},
	{
		name: 'hammer bros fight',

		sprites: 0x1579d7,
	},
	{
		name: 'hammer bros fight 2',

		sprites: 0x158b74,
	},
	{
		name: 'hammer bros fight 3',

		sprites: 0x158b82,
	},
	...potentialSpriteStarts.map((pss) => ({ sprites: pss })),
];

const loadableLevels = ['1-1', '2-1', '7-6'] as const;
type InGameLevelId = typeof loadableLevels[number];

export { inGameLevels, loadableLevels };
export type { InGameLevel, InGameLevelId };
