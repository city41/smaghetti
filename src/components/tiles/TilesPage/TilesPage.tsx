import React, { useState } from 'react';
import clsx from 'clsx';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { TilePage } from '../../../tiles/extractCompressedTilesFromRom';
import { TileImage } from './TileImage';
import { Button } from '../../Button';

type TilesPageProps = {
	allFilesReady: boolean;
	onDumpCompressedTiles: () => void;
	onDumpUncompressedTiles: () => void;
	dumpType: 'compressed' | 'uncompressed';
	pages: TilePage[];
	shift: number;
	onSetShift: (newShift: number) => void;
};

function parseBytes(byteStr: string): number[] {
	byteStr = byteStr.trim();

	if (!byteStr.includes(' ')) {
		// no spaces? probably copied from mGBA
		const bytes = [];
		for (let i = 0; i < byteStr.length; i += 2) {
			const bs = byteStr.substr(i, 2);

			bytes.push(parseInt(bs, 16));
		}

		return bytes;
	}

	const split = byteStr.split(' ');

	return split.reduce<number[]>((building, s) => {
		const byte = parseInt(s.trim(), 16);

		if (isNaN(byte)) {
			return building;
		} else {
			return building.concat(byte);
		}
	}, []);
}

function doesTileMatchBytes(tile: number[], bytes: number[]): boolean {
	if (bytes.length === 0) {
		return false;
	}

	for (let i = 0; i < bytes.length; ++i) {
		if (i >= tile.length) {
			return true;
		}

		if (tile[i] !== bytes[i]) {
			return false;
		}
	}

	return true;
}

function TilesPage({
	allFilesReady,
	onDumpCompressedTiles,
	onDumpUncompressedTiles,
	dumpType,
	pages,
	shift,
	onSetShift,
}: TilesPageProps) {
	const [pageIndex, setPageIndex] = useState(0);
	const [showIndices, setShowIndices] = useState(false);
	const [offsetText, setOffsetText] = useState('');
	const [cols, setGridCols] = useState(32);
	const [byteSearchString, setByteSearchString] = useState('');
	const [focusedIndex, setFocusedIndex] = useState(-1);

	const curPage = pages[pageIndex];

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<div className={clsx('py-2', { hidden: pages.length > 0 })}>
				<p>
					This page shows all the graphics inside a SMA4 rom, choose a dump type
					to begin
				</p>
				<ul className="-ml-4 pl-4 space-y-2 py-4">
					<li>
						<Button
							className="mr-4"
							disabled={!allFilesReady}
							onClick={onDumpCompressedTiles}
						>
							dump compressed
						</Button>
						all the graphics in the game that were compressed with LZ77
					</li>
					<li>
						<Button
							className="mr-4"
							disabled={!allFilesReady}
							onClick={onDumpUncompressedTiles}
						>
							dump uncompressed
						</Button>
						all the graphics that are directly in the rom and not compressed
					</li>
				</ul>

				<div className="space-x-4"></div>
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
						<input
							className="w-28 text-black px-1"
							type="text"
							value={offsetText}
							onChange={(e) => setOffsetText(e.target.value)}
						/>
						<Button
							onClick={() => {
								const offset = parseInt(offsetText, 16);

								const matchingPage = pages.find((p) => p.address === offset);

								if (matchingPage) {
									setPageIndex(pages.indexOf(matchingPage));
								}
							}}
						>
							Go
						</Button>
						{dumpType === 'uncompressed' && (
							<>
								<div className="inline-block">shift: {shift}</div>
								<Button onClick={() => onSetShift(shift - 4)}>-</Button>
								<Button onClick={() => onSetShift(shift + 4)}>+</Button>
							</>
						)}
						<div className="inline-block">cols: {cols}</div>
						<Button onClick={() => setGridCols(cols - 1)}>-</Button>
						<Button onClick={() => setGridCols(cols + 1)}>+</Button>
						<input
							className="w-64 text-black px-1"
							type="text"
							value={byteSearchString}
							onChange={(e) => setByteSearchString(e.target.value)}
						/>
						<Button
							onClick={() => {
								const bytes = parseBytes(byteSearchString);

								const matchingPage = pages.find((p) => {
									return p.tiles.some((t) => {
										return doesTileMatchBytes(t, bytes);
									});
								});

								if (matchingPage) {
									setPageIndex(pages.indexOf(matchingPage));
									const tileIndex = matchingPage.tiles.findIndex((t) =>
										doesTileMatchBytes(t, bytes)
									);
									setFocusedIndex(tileIndex);
								}
							}}
						>
							Search
						</Button>
					</h1>
					<div
						className="grid"
						style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
					>
						{curPage.tiles.map((tile, i) => (
							<TileImage
								className={clsx('w-full h-full', {
									'border border-white': showIndices,
								})}
								key={i}
								focused={focusedIndex === i}
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
