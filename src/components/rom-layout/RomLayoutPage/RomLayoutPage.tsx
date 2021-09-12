import React, { useState } from 'react';
import { Button } from '../../Button';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { RomSection, RomSectionType } from '../types';
import { CompressedTilesPreview } from './CompressedTilesPreview';
import { LevelObjectsPreview } from './LevelObjectsPreview';
import { LevelSpritesPreview } from './LevelSpritesPreview';

import styles from './RomLayoutPage.module.css';
import { SectionPercentage } from './SectionPercentage';

type RomLayoutPageProps = {
	allFilesReady: boolean;
	sections: RomSection[];
};

function RomSectionCmp({ section }: { section: RomSection }) {
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
		<tr className={section.type}>
			<td>0x{section.start.toString(16)}</td>
			<td>0x{section.size.toString(16)}</td>
			<td>{section.type}</td>
			<td>{section.label}</td>
			<td>{preview}</td>
		</tr>
	);
}

function RomLayoutPage({ allFilesReady, sections }: RomLayoutPageProps) {
	const [hideSections, setHideSections] = useState<
		Record<RomSectionType, boolean>
	>({
		'compressed-tiles': false,
		'level-objects': false,
		'level-sprites': false,
	});

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />

			<div className="max-w-2xl mx-auto my-16">
				<p className="bg-green-700 text-white p-2">
					This page shows where things are inside the game ROM. It is a work in
					progress.
				</p>

				<SectionPercentage />
				<div className="flex flex-row justify-center gap-x-2 my-8">
					{(Object.keys(hideSections) as RomSectionType[]).map((hs) => (
						<Button
							key={hs}
							onClick={() => {
								setHideSections((hide) => {
									return {
										...hide,
										[hs]: !hide[hs],
									};
								});
							}}
						>
							{hideSections[hs] ? 'show' : 'hide'} {hs}
						</Button>
					))}
				</div>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>offset</th>
							<th>size</th>
							<th>type</th>
							<th>content</th>
							<th>preview</th>
						</tr>
					</thead>
					<tbody>
						{sections.map((s, i) => {
							if (hideSections[s.type]) {
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
