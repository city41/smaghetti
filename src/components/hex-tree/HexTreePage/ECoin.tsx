import React from 'react';
import { gba16ToRgb } from '../../../tiles/extractResourcesToStylesheet';
import { PalettedEntity } from '../../palettes/PalettesPage/PalettedEntity';
import { bytesToHexString } from './HexTree/ByteInputField';
import { extractResourceTileData } from '../../../tiles/extractResourcesToStylesheet';

type ECoinProps = {
	data: Uint8Array;
};

const PALETTE_OFFSET = 0x40;
const PALETTE_SIZE = 0x20;
const PIXELS_OFFSET = 0x60;
const PIXELS_SIZE = 0x120;

function gbaToBgColor(gbaColor: [number, number]): string {
	const as16Bit = (gbaColor[0] << 8) | gbaColor[1];

	const asRgbArray = gba16ToRgb(as16Bit);

	return `rgb(${asRgbArray[0]}, ${asRgbArray[1]}, ${asRgbArray[2]})`;
}

export const ECOIN_TILES = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
].map((row) => {
	return row.map((c) => ({ tileIndex: c, uncompressed: true }));
});

function ECoin({ data }: ECoinProps) {
	if (data[0] === 0) {
		return <div>no E-Coin in this level</div>;
	} else {
		const palette = Array.from(data).slice(
			PALETTE_OFFSET,
			PALETTE_OFFSET + PALETTE_SIZE
		);
		const paletteEntries = [];
		const palette16Bit: Tuple<number, 16> = [];
		const palette16BitRaw: Tuple<number, 16> = [];

		for (let i = 0; i < palette.length; i += 2) {
			paletteEntries.push(palette.slice(i, i + 2).reverse());
			palette16Bit.push((palette[i + 1] << 8) | palette[i]);
			palette16BitRaw.push(palette[i], palette[i + 1]);
		}

		const extractedPixelData = extractResourceTileData(data, {
			palettes: [palette],
			romOffset: PIXELS_OFFSET,
			tiles: ECOIN_TILES,
		});

		const rawPixelData = Array.from(data).slice(
			PIXELS_OFFSET,
			PIXELS_OFFSET + PIXELS_SIZE
		);

		return (
			<div className="p-4">
				<h2>Palette</h2>
				<p>(Displayed in big endian)</p>
				<div className="flex flex-row flex-wrap gap-x-2">
					{paletteEntries.map((pe, i) => (
						<div key={i} className="flex flex-col gap-y-2">
							<div className="bg-gray-400 px-1">{bytesToHexString(pe)}</div>
							<div
								className="w-full h-8"
								style={{
									backgroundColor: gbaToBgColor(pe as [number, number]),
								}}
							/>
						</div>
					))}
				</div>
				<p>(Displayed raw, little endian)</p>
				<div className="flex flex-row flex-wrap gap-x-2">
					<div className="bg-gray-400 px-1">
						{bytesToHexString(palette16BitRaw)}
					</div>
				</div>
				<h2>Coin</h2>
				<PalettedEntity
					className="w-16 h-16"
					entity={extractedPixelData}
					palette={palette16Bit}
				/>
				<p>(Displayed raw, little endian)</p>
				<div className="flex flex-row flex-wrap gap-x-2">
					<div className="bg-gray-400 px-1">
						{bytesToHexString(rawPixelData)}
					</div>
				</div>
			</div>
		);
	}
}

export { ECoin };
