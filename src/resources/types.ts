import { CanvasGenerator } from '../tiles/extractResourcesToStylesheet';

type TileExtractionSpec = {
	romOffset?: number;
	palette?: number;
	tileIndex: number;
	paletteIndex?: number;
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
	extract: (rom: Uint8Array, canvasGenerator: CanvasGenerator) => string;
};

type Resource = StaticResource | DerivedResource;

export type { TileExtractionSpec, StaticResource, DerivedResource, Resource };
