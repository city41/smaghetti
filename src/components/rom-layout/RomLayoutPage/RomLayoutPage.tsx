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

import styles from './RomLayoutPage.module.css';
import { SectionPercentage } from './SectionPercentage';

type RomLayoutPageProps = {
	allFilesReady: boolean;
	sections: RomSection[];
};

function Details({ section }: { section: RomSection }) {
	switch (section.type) {
		case 'compressed-tiles':
			return <CompressedTilesDetails page={section.page} />;
		case 'level-sprites':
			return <LevelSpritesDetails offset={section.start} />;
		case 'level-objects':
			return <LevelObjectsDetails offset={section.start} size={section.size} />;
		default:
			return <>details</>;
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
		default:
			preview = '-';
	}

	return (
		<>
			<tr className={section.type}>
				<td>
					<Button onClick={() => setShowDetails((d) => !d)}>
						{showDetails ? '-' : '+'}
					</Button>
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

const sectionTypes: RomSectionType[] = [
	'compressed-tiles',
	'level-objects',
	'level-sprites',
];

function RomLayoutPage({ allFilesReady, sections }: RomLayoutPageProps) {
	const [sectionToShow, setSectionToShow] = useState<RomSectionType | null>(
		null
	);

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />

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
						>
							{s}
						</Button>
					))}
					<Button onClick={() => setSectionToShow(null)}>all</Button>
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
