import React, { useState } from 'react';
import { Button } from '../../Button';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { RomSection, RomSectionType } from '../types';
import { CompressedTilesPreview } from './CompressedTilesPreview';
import { CompressedTilesDetails } from './CompressedTilesDetails';
import { LevelObjectsPreview } from './LevelObjectsPreview';
import { LevelObjectsDetails } from './LevelObjectsDetails';
import { LevelSpritesPreview } from './LevelSpritesPreview';
import { LevelSpritesDetails } from './LevelSpritesDetails';
import { LevelNameTableDetails } from './LevelNameTableDetails';
import { PalettePreview } from './PalettePreview';

import styles from './RomLayoutPage.module.css';
import { SectionPercentage } from './SectionPercentage';
import { PalettedEntity } from '../../palettes/PalettesPage/PalettedEntity';
import { getRom } from '../../FileLoader/files';
import { ECOIN_TILES } from '../../hex-tree/HexTreePage/ECoin';
import { extractResourceTileData } from '../../../tiles/extractResourcesToStylesheet';
import { toHexString } from '../../hex-tree/HexTreePage/util';
import { ECOIN_PALETTE_SIZE } from '../../../levelData/typesAndConstants';
import { bytesToHexString } from '../../hex-tree/HexTreePage/HexTree/ByteInputField';

type RomLayoutPageProps = {
	allFilesReady: boolean;
	sections: RomSection[];
	wiiUMode?: boolean;
};

const HAS_DETAILS: RomSectionType[] = [
	'compressed-tiles',
	'level-sprites',
	'level-objects',
	'level-name-table',
	'e-coin-palette',
];

function Details({ section }: { section: RomSection }) {
	switch (section.type) {
		case 'compressed-tiles':
			return <CompressedTilesDetails page={section.page} />;
		case 'level-sprites':
			return <LevelSpritesDetails offset={section.start} />;
		case 'level-objects':
			return <LevelObjectsDetails offset={section.start} size={section.size} />;
		case 'level-name-table':
			return (
				<LevelNameTableDetails offset={section.start} size={section.size} />
			);
		case 'e-coin-palette': {
			const palette = Array.from(
				getRom()!.slice(section.start, section.start + section.size)
			);

			return <div>{bytesToHexString(palette)}</div>;
		}
		default:
			return null;
	}
}

function RomSectionCmp({ section }: { section: RomSection }) {
	const [showDetails, setShowDetails] = useState(false);

	let preview;

	switch (section.type) {
		case 'compressed-tiles':
			preview = <CompressedTilesPreview page={section.page} />;
			break;
		case 'level-sprites':
			preview = <LevelSpritesPreview offset={section.start} />;
			break;
		case 'level-objects':
			preview = (
				<LevelObjectsPreview offset={section.start} size={section.size} />
			);
			break;
		case 'e-coin': {
			const rom = getRom()!;
			const palette = Array.from(
				rom.slice(0x426b40, 0x426b40 + ECOIN_PALETTE_SIZE)
			);
			const palette16Bit: Tuple<number, 16> = [];

			for (let i = 0; i < palette.length; i += 2) {
				palette16Bit.push((palette[i + 1] << 8) | palette[i]);
			}

			const extractedPixelData = extractResourceTileData(rom, {
				romOffset: section.start,
				tiles: ECOIN_TILES,
				palettes: [palette],
			});

			preview = (
				<PalettedEntity entity={extractedPixelData} palette={palette16Bit} />
			);

			break;
		}
		case 'e-coin-palette': {
			preview = <PalettePreview offset={section.start} size={section.size} />;
			break;
		}
		case 'compressed-e-level': {
			const header = getRom()!.slice(section.start, section.start + 8);
			const headerHex = Array.from(header).map(toHexString);
			preview = <div>{headerHex.join(' ')} A S R O</div>;
			break;
		}
		default:
			preview = '-';
	}

	return (
		<>
			<tr className={section.type}>
				<td>
					{HAS_DETAILS.includes(section.type) && (
						<Button onClick={() => setShowDetails((d) => !d)}>
							{showDetails ? '-' : '+'}
						</Button>
					)}
				</td>
				<td>0x{section.start.toString(16)}</td>
				<td>0x{section.size.toString(16)}</td>
				<td>{section.type}</td>
				<td>{section.label}</td>
				<td>{preview}</td>
			</tr>
			{showDetails && (
				<tr>
					<td colSpan={6}>
						<Details section={section} />
					</td>
				</tr>
			)}
		</>
	);
}

const gbaSectionTypes: RomSectionType[] = [
	'compressed-tiles',
	'level-objects',
	'level-sprites',
];

const wiiUiSectionTypes: RomSectionType[] = gbaSectionTypes.concat([
	'level-name-table',
	'compressed-e-level',
	'e-coin',
	'e-coin-palette',
]);

function RomLayoutPage({
	allFilesReady,
	sections,
	wiiUMode,
}: RomLayoutPageProps) {
	const [sectionToShow, setSectionToShow] = useState<RomSectionType | null>(
		null
	);

	const sectionTypes = wiiUMode ? wiiUiSectionTypes : gbaSectionTypes;

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} wiiUMode={wiiUMode} />

			<div className="max-w-2xl mx-auto my-16">
				<p className="bg-green-700 text-white p-2">
					This page shows where things are inside the game ROM. It is a work in
					progress.
				</p>
				<p className="bg-red-700 text-white p-2 my-4">
					Most level-objects detail views (click the plus sign on a row) are
					currently totally wrong. Try 1-1 for a somewhat decent one.
				</p>

				<SectionPercentage />
				<div className="flex flex-row justify-center gap-x-2 my-8">
					{sectionTypes.map((s) => (
						<Button
							key={s}
							onClick={() => {
								setSectionToShow(s);
							}}
							disabled={s === sectionToShow}
						>
							{s}
						</Button>
					))}
					<Button
						disabled={sectionToShow === null}
						onClick={() => setSectionToShow(null)}
					>
						all
					</Button>
				</div>
				<table className={styles.table}>
					<thead>
						<tr>
							<th />
							<th>offset</th>
							<th>size</th>
							<th>type</th>
							<th>content</th>
							<th>preview</th>
						</tr>
					</thead>
					<tbody>
						{sections.map((s, i) => {
							if (sectionToShow && sectionToShow !== s.type) {
								return null;
							} else {
								return <RomSectionCmp key={`${i}-${s.start}`} section={s} />;
							}
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export { RomLayoutPage };
