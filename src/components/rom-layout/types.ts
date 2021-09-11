export type RomSectionType =
	| 'code'
	| 'compressed-tiles'
	| 'uncompressed-tiles'
	| 'level-objects'
	| 'level-sprites'
	| 'raw';

export type RomSection = {
	label?: string;
	start: number;
	size: number;
	type: RomSectionType;
};
