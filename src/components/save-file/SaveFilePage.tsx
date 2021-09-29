import React, { useState } from 'react';
import { parseSaveFile } from '../../levelData/parseSaveFile';
import {
	ECOIN_PALETTE_SIZE,
	ECOIN_TILE_SIZE,
	MAX_ECOIN_TABLE,
	OFFSET_ECOIN,
	OFFSET_ECOIN_PALETTE_DATA,
	OFFSET_ECOIN_TILE_DATA,
	SaveFile,
} from '../../levelData/typesAndConstants';
import { extractResourceTileData } from '../../tiles/extractResourcesToStylesheet';
import { PalettedEntity } from '../palettes/PalettesPage/PalettedEntity';

type ECoinData = {
	palette: number[];
	tiles: number[];
};

const ECOIN_TILES = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
].map((row) => {
	return row.map((c) => ({ tileIndex: c, uncompressed: true }));
});

function getECoins(saveFile: Uint8Array): Array<ECoinData> {
	const result = [];

	for (let i = 0; i < MAX_ECOIN_TABLE; ++i) {
		const palette = Array.from(
			saveFile.slice(
				OFFSET_ECOIN_PALETTE_DATA + i * ECOIN_PALETTE_SIZE,
				OFFSET_ECOIN_PALETTE_DATA + (i + 1) * ECOIN_PALETTE_SIZE
			)
		);

		const tiles = Array.from(
			saveFile.slice(
				OFFSET_ECOIN_TILE_DATA + i * ECOIN_TILE_SIZE,
				OFFSET_ECOIN_TILE_DATA + (i + 1) * ECOIN_TILE_SIZE
			)
		);

		result.push({ palette, tiles });
	}

	return result;
}

function SaveFilePage() {
	const [eCoins, setECoins] = useState<ECoinData[]>([]);
	const [saveFile, setSaveFile] = useState<SaveFile | null>(null);

	function handleSaveFile(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files![0];

		const fileReader = new FileReader();

		fileReader.onload = () => {
			const saveFileData = new Uint8Array(fileReader.result as ArrayBuffer);
			const ecoins = getECoins(saveFileData);
			setECoins(ecoins);
			setSaveFile(parseSaveFile(saveFileData));
		};

		fileReader.readAsArrayBuffer(file);
	}

	return (
		<div className="h-screen">
			<div className="flex flex-row gap-x-4">
				<div>choose a .sav file:</div>
				<input
					type="file"
					style={{ color: 'white !important' }}
					accept=".sav"
					onChange={handleSaveFile}
				/>
			</div>
			{saveFile && (
				<>
					<h1 className="my-4 text-lg font-bold">
						E-Coin status table at 0x{OFFSET_ECOIN.toString(16)}
					</h1>
					<div className="flex flex-row gap-x-1">
						{saveFile.ecoinArray.map((b, i) => (
							<div key={i} className="bg-gray-600">
								{b.toString(16)}
							</div>
						))}
					</div>
				</>
			)}
			{eCoins.length > 0 && (
				<h1 className="my-4 text-lg font-bold">
					E-Coin graphics table at 0x{OFFSET_ECOIN_PALETTE_DATA.toString(16)}{' '}
					(palettes) / 0x
					{OFFSET_ECOIN_TILE_DATA.toString(16)} (tiles)
				</h1>
			)}
			<div className="grid grid-cols-8 gap-4 p-4">
				{eCoins.map((e, i) => {
					const data = new Uint8Array(e.tiles);
					const extractedPixelData = extractResourceTileData(data, {
						palettes: [e.palette],
						romOffset: 0,
						tiles: ECOIN_TILES,
					});

					const palette16Bit: Tuple<number, 16> = [];

					for (let i = 0; i < e.palette.length; i += 2) {
						palette16Bit.push((e.palette[i + 1] << 8) | e.palette[i]);
					}

					return (
						<div key={i} className="flex flex-col items-center gap-y-2">
							<PalettedEntity
								className="w-16 h-16"
								entity={extractedPixelData}
								palette={palette16Bit}
							/>
							<div>{i}</div>
						</div>
					);
				})}
			</div>
			{saveFile && (
				<>
					<h1 className="my-4 text-lg font-bold">Level Data</h1>
					<div className="flex flex-row flex-wrap gap-4">
						{saveFile.data.map((d) => {
							const toShow = { info: d.info, recordId: d.recordID };
							// @ts-ignore
							delete toShow.info.name;

							return (
								<div key={d.recordID} className="p-2 bg-gray-600">
									<pre>{JSON.stringify(toShow, null, 2)}</pre>
								</div>
							);
						})}
					</div>
					<h1 className="my-4 text-lg font-bold">Level Records</h1>
					<div className="flex flex-row flex-wrap gap-4">
						{saveFile.records.map((r) => {
							// @ts-ignore
							delete r.info.name;

							return (
								<div key={r.dataID} className="p-2 bg-gray-600">
									<pre>{JSON.stringify(r, null, 2)}</pre>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export { SaveFilePage };
