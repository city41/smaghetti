import React from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { RomSection as RomSectionType } from '../types';

import styles from './RomLayoutPage.module.css';
import { SectionPercentage } from './SectionPercentage';

type RomLayoutPageProps = {
	allFilesReady: boolean;
	sections: RomSectionType[];
};

function RomSection({ section }: { section: RomSectionType }) {
	return (
		<tr>
			<td>0x{section.start.toString(16)}</td>
			<td>{section.type}</td>
			<td>{section.label}</td>
		</tr>
	);
}

function RomLayoutPage({ allFilesReady, sections }: RomLayoutPageProps) {
	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />

			<div className="max-w-2xl mx-auto my-16">
				<SectionPercentage />
				<table className={styles.table}>
					<thead>
						<tr>
							<th>offset</th>
							<th>type</th>
							<th>label</th>
						</tr>
					</thead>
					<tbody>
						{sections.map((s) => {
							return <RomSection key={s.start} section={s} />;
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export { RomLayoutPage };
