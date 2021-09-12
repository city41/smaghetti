import React from 'react';
import { TilePage } from '../../../tiles/extractCompressedTilesFromRom';
import { TileImage } from '../../tiles/TilesPage/TileImage';

type CompressedTilesDetailsProps = {
	page: TilePage;
};

function CompressedTilesDetails({ page }: CompressedTilesDetailsProps) {
	const tileImages = page.tiles.map((t, i) => (
		<TileImage key={i} index={null} tile={t} className="w-4 h-4 bg-gray-600" />
	));

	return <div className="flex flex-row flex-wrap gap-2">{tileImages}</div>;
}

export { CompressedTilesDetails };
