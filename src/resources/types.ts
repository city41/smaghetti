import { CanvasGenerator } from '../tiles/extractResourcesToStylesheet';

type TileExtractionSpec = {
	romOffset?: number;
	palette?: number;
	tileIndex: number;
	flip?: 'h' | 'v' | 'hv';
	uncompressed?: boolean;
	shift?: number;
};

type StaticResource = {
	romOffset?: number;
	palettes: number[][];
	firstColorOpaque?: boolean;
	tiles: Array<Array<number | TileExtractionSpec | null>>;
};

type DerivedResource = {
	extract: (
		rom: Uint8Array,
		canvasGenerator: CanvasGenerator
	) => HTMLCanvasElement;
};

type Resource = StaticResource | DerivedResource;

export type { TileExtractionSpec, StaticResource, DerivedResource, Resource };
