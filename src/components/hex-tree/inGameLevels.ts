type InGameLevel = {
	name: string;
	root: number;
	sprites: number;
	objects: number;
};

const inGameLevels: InGameLevel[] = [
	{
		name: '1-1',
		root: 0x1408c7,
		sprites: 0x157811,
		objects: 0x1408c7 + 15,
	},
	{
		name: '1-2',
		root: 0x141db8,
		sprites: 0x157a93,
		objects: 0x141db8 + 15,
	},
];

export { inGameLevels };
export type { InGameLevel };
