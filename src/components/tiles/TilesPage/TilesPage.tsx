import React, { useState } from 'react';
import clsx from 'clsx';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { TilePage } from '../../../tiles/extractTilesFromRom';
import { TileImage } from './TileImage';
import { Button } from '../../Button';

type TilesPageProps = {
	allFilesReady: boolean;
	onDumpTiles: () => void;
	pages: TilePage[];
};

function TilesPage({ allFilesReady, onDumpTiles, pages }: TilesPageProps) {
	const [pageIndex, setPageIndex] = useState(0);
	const [showIndices, setShowIndices] = useState(false);

	const curPage = pages[pageIndex];

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<div className="py-2">
				<p>
					This page shows all the graphics inside a SMA4 rom, press "dump" to
					begin
				</p>
				<Button disabled={!allFilesReady} onClick={onDumpTiles}>
					dump
				</Button>
			</div>
			{curPage && (
				<div>
					<h1 className="text-xl font-bold mb-2 space-x-4">
						<Button
							onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
							disabled={pageIndex === 0}
						>
							prev
						</Button>
						<span className="inline-block mx-2">
							0x{curPage.address.toString(16)} ({pageIndex}/{pages.length - 1})
						</span>
						<Button
							onClick={() =>
								setPageIndex((p) => Math.min(pages.length - 1, p + 1))
							}
							disabled={pageIndex === pages.length - 1}
						>
							next
						</Button>
						<Button
							onClick={() => {
								setShowIndices((si) => !si);
							}}
						>
							{showIndices ? 'hide indices' : 'show indices'}
						</Button>
					</h1>
					<div
						className="grid"
						style={{ gridTemplateColumns: 'repeat(32, 1fr)' }}
					>
						{curPage.tiles.map((tile, i) => (
							<TileImage
								className={clsx('w-full h-full', {
									'border border-white': showIndices,
								})}
								key={i}
								index={showIndices ? i : null}
								tile={tile}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
}

export { TilesPage };
