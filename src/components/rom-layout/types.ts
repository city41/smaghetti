import { TilePage } from '../../tiles/extractCompressedTilesFromRom';

export type BaseRomSection = {
	label?: string;
	start: number;
	size: number;
};

export type CompressedTilesRomSection = BaseRomSection & {
	type: 'compressed-tiles';
	page: TilePage;
};

export type LevelObjectsRomSection = BaseRomSection & {
	type: 'level-objects';
};

export type LevelSpritesRomSection = BaseRomSection & {
	type: 'level-sprites';
};

export type RomSection =
	| CompressedTilesRomSection
	| LevelObjectsRomSection
	| LevelSpritesRomSection;
export type RomSectionType = RomSection['type'];
