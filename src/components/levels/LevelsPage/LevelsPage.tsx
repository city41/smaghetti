import React, { ReactNode, useState } from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { Root } from '../../layout/Root';
import { LoadingBar } from '../../LoadingBar';
import { LevelRow } from './LevelRow';
import { SaveFileList } from './SaveFileList';
import { downloadSetOfLevelsAsSaveFile } from '../../../levelData/downloadLevelAsSaveFile';
import { HowToUseDownloadModal } from '../../HowToUseDownloadModal';
import { OtherFilesState } from '../../FileLoader/fileLoaderSlice';

type InternalLevelsPageProps = {
	allFilesReady: boolean;
	emptySaveFileState: OtherFilesState;
	loadState: 'dormant' | 'loading' | 'success' | 'error';
	levels: Level[];
	headerTitle: string;
	pageTitle: string;
	hideHelpCallout?: boolean;
	hideVotes?: boolean;
	noPublishedLevelsNode: ReactNode;
	titleAddendum?: ReactNode;
};

const MAX_LEVELS_IN_SAVE = 32;

function LevelsPage({
	allFilesReady,
	emptySaveFileState,
	loadState,
	levels,
	headerTitle,
	pageTitle,
	noPublishedLevelsNode,
	hideVotes,
	titleAddendum,
}: InternalLevelsPageProps) {
	const [showFileLoaderModal, setShowFileLoaderModal] = useState(false);
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
			body = <LoadingBar percent={-1} />;
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
						<div>
							<SaveFileList
								emptySaveFileState={emptySaveFileState}
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
							<div className="space-y-8 mt-8">
								{levels.map((l) => (
									<LevelRow
										key={l.id}
										level={l}
										hideVotes={hideVotes}
										isBuildingSave={isBuildingSave}
										isChosen={chosenLevels.includes(l)}
										areFilesReady={allFilesReady}
										onChosenChange={(newChosen) => {
											if (
												newChosen &&
												chosenLevels.length < MAX_LEVELS_IN_SAVE
											) {
												setChosenLevels((cl) => cl.concat(l));
											} else {
												setChosenLevels((cl) => cl.filter((cll) => cll !== l));
											}
										}}
										onLoadRomClick={() => setShowFileLoaderModal(true)}
									/>
								))}
							</div>
						</div>
					</>
				);
			} else {
				body = <div className="text-center mt-32">{noPublishedLevelsNode}</div>;
			}
			break;
	}

	return (
		<>
			<FileLoaderModal
				isOpen={showFileLoaderModal && !allFilesReady}
				onRequestClose={() => setShowFileLoaderModal(false)}
			/>
			<Root title={headerTitle} metaDescription="">
				<div className="max-w-2xl mx-auto pt-16">
					<h1 className="font-bold text-5xl text-center mb-8">{pageTitle}</h1>
					{titleAddendum}
					{body}
				</div>
			</Root>
		</>
	);
}

export { LevelsPage, MAX_LEVELS_IN_SAVE };
