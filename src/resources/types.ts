type TileExtractionSpec = {
	romOffset: number;
	tileIndex: number;
	flip?: 'h' | 'v' | 'hv';
	uncompressed?: boolean;
	shift?: number;
};

type StaticResource = {
	type: string;
	romOffset?: number;
	palette: number[];
	tiles: Array<Array<number | TileExtractionSpec>>;
};

type DerivedResource = {
	type: string;
	romOffset?: number;
	extract?: (rom: Uint8Array) => string;
};

type Resource = StaticResource | DerivedResource;

export type { TileExtractionSpec, StaticResource, DerivedResource, Resource };
