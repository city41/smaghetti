type InGameLevel = {
	name: string;
	root: number;
	sprites: number;
};

const inGameLevels: InGameLevel[] = [
	{
		name: '1-1',
		root: 0,
		sprites: 0x157811,
	},
	{
		name: '1-2',
		root: 0,
		sprites: 0x157a93,
	},
	{
		name: '2-5',
		root: 0,
		sprites: 0x158c56,
	},
	{
		name: 'unknown-1',
		root: 0,
		sprites: 0x15875d,
	},
	{
		name: 'unknown-2',
		root: 0,
		sprites: 0x157b1d,
	},
	{
		name: 'unknown-3',
		root: 0,
		sprites: 0x157e5d,
	},
];

export { inGameLevels };
export type { InGameLevel };
