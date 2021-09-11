import React from 'react';
import { TilePage } from '../../../tiles/extractCompressedTilesFromRom';
import { TileImage } from '../../tiles/TilesPage/TileImage';

type CompressedTilesPreviewProps = {
	page: TilePage;
};

function getFirstNonBlankTileIndex(tiles: number[][]): number {
	return tiles.findIndex((t) => t.some((v) => !!v));
}

function CompressedTilesPreview({ page }: CompressedTilesPreviewProps) {
	const start = getFirstNonBlankTileIndex(page.tiles);
	const tiles = page.tiles.slice(start, start + 5);

	const tileImages = tiles.map((t, i) => (
		<TileImage key={i} index={null} tile={t} className="w-6 h-6" />
	));

	return <div className="flex flex-row gap-x-2">{tileImages}</div>;
}

export { CompressedTilesPreview };
