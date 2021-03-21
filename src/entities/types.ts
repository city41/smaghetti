type TileExtractionSpec = {
	romOffset: number;
	tileIndex: number;
	flip?: 'h' | 'v' | 'hv';
	uncompressed?: boolean;
	shift?: number;
};

type BaseEntity = {
	type: string;
	romOffset?: number;
	palette: number[];
	tiles: Array<Array<number | TileExtractionSpec>>;
};

type ObjectEntity = BaseEntity & {
	mode: 'Object';
	dimensions: 1 | 2;
	settingsType: 'none' | 'single' | 'grouped';
	defaultSettings: Record<string, any>;
	toBinary: (
		x: number,
		y: number,
		w: number,
		h: number,
		settings: Record<string, any>
	) =>
		| [number, number, number, number]
		| [number, number, number, number, number];
};

type SpriteEntity = BaseEntity & {
	mode: 'Sprite';
	toBinary: (
		x: number,
		y: number,
		settings: Record<string, any>
	) => [number, number, number, number];
};

type ResourceEntity = ObjectEntity | SpriteEntity;

export type { TileExtractionSpec, ResourceEntity, ObjectEntity, SpriteEntity };
