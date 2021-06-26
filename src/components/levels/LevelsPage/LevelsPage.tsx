import React, { useState } from 'react';
import clsx from 'clsx';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { Root } from '../../layout/Root';
import { LoadingBar } from '../../LoadingBar';
import { LevelRow } from './LevelRow';
import { SaveFileList } from './SaveFileList';
import { downloadSetOfLevelsAsSaveFile } from '../../../levelData/downloadLevelAsSaveFile';
import { HowToUseDownloadModal } from '../../HowToUseDownloadModal';

type InternalLevelsPageProps = {
	allFilesReady: boolean;
	loadState: 'dormant' | 'loading' | 'success' | 'error';
	levels: Level[];
};

function LevelsPage({
	allFilesReady,
	loadState,
	levels,
}: InternalLevelsPageProps) {
	const [isBuildingSave, setIsBuildingSave] = useState(false);
	const [chosenLevels, setChosenLevels] = useState<Level[]>([]);
	const [showDownloadHelp, setShowDownloadHelp] = useState(false);

	let body = null;

	function downloadSave(levels: Level[]) {
		downloadSetOfLevelsAsSaveFile(levels, 'smaghetti');
		setShowDownloadHelp(true);
		setIsBuildingSave(false);
		setChosenLevels([]);
	}

	switch (loadState) {
		case 'dormant':
		case 'loading':
			body = <LoadingBar percent={100} />;
			break;
		case 'error':
			body = (
				<div className="bg-red-200 text-black p-2">
					Hmmm, levels failed to load. Try refreshing the browser.
				</div>
			);
			break;
		case 'success':
			if (levels.length > 0) {
				body = (
					<>
						<HowToUseDownloadModal
							isOpen={showDownloadHelp}
							onRequestClose={() => setShowDownloadHelp(false)}
						/>
						<div className="space-y-8">
							<SaveFileList
								className="mx-12 sticky top-0 z-10"
								style={{ minHeight: '3rem' }}
								chosenLevelCount={chosenLevels.length}
								totalLevelCount={levels.length}
								onStartClick={() => {
									setIsBuildingSave(true);
								}}
								onCancelClick={() => {
									setIsBuildingSave(false);
									setChosenLevels([]);
								}}
								onSaveClick={() => downloadSave(chosenLevels)}
								isBuilding={isBuildingSave}
							/>
							<div
								className={clsx('space-y-8', {
									'border-4 border-green-300': isBuildingSave,
								})}
							>
								{levels.map((l) => (
									<LevelRow
										key={l.id}
										level={l}
										isBuildingSave={isBuildingSave}
										isChosen={chosenLevels.includes(l)}
										onChosenChange={(newChosen) => {
											if (newChosen && chosenLevels.length < 30) {
												setChosenLevels((cl) => cl.concat(l));
											} else {
												setChosenLevels((cl) => cl.filter((cll) => cll !== l));
											}
										}}
									/>
								))}
							</div>
						</div>
					</>
				);
			} else {
				body = (
					<div className="text-center mt-32">
						No published levels yet, why not{' '}
						<a className="text-blue-300 hover:underline" href="/editor">
							be the first?
						</a>
					</div>
				);
			}
			break;
	}

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<Root title="Levels" metaDescription="">
				<div className="max-w-2xl mx-auto pt-16">
					<h1 className="font-bold text-5xl text-center mb-8">
						Community made levels
					</h1>
					<p className="mt-4 mb-8 px-8 text-sm text-gray-400">
						Want your level to show up here? Click on the &quot;publish&quot;
						button when looking at all your levels in the editor.
					</p>
					{body}
				</div>
			</Root>
		</>
	);
}

export { LevelsPage };
