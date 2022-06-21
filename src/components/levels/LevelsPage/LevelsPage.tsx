import React, { ReactNode, useState } from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { Root } from '../../layout/Root';
import { LoadingBar } from '../../LoadingBar';
import { LevelRow } from './LevelRow';
import { SaveFileList } from './SaveFileList';
import { downloadSetOfLevelsAsSaveFile } from '../../../levelData/downloadLevelAsSaveFile';
import { HowToUseDownloadModal } from '../../HowToUseDownloadModal';
import { OtherFilesState } from '../../FileLoader/fileLoaderSlice';
import { Button } from '../../Button';
import clsx from 'clsx';

type InternalLevelsPageProps = {
	allFilesReady: boolean;
	emptySaveFileState: OtherFilesState;
	loadState: 'dormant' | 'loading' | 'success' | 'error';
	levels: Level[];
	sortType: 'likes' | 'new';
	headerTitle: string;
	pageTitle: string;
	hideHelpCallout?: boolean;
	noPublishedLevelsNode: ReactNode;
	onSortTypeChange: () => void;
};

const MAX_LEVELS_IN_SAVE = 32;

function LevelsPage({
	allFilesReady,
	emptySaveFileState,
	loadState,
	levels,
	sortType,
	headerTitle,
	pageTitle,
	noPublishedLevelsNode,
	onSortTypeChange,
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

	const newestLevel =
		levels.length > 2 &&
		levels.reduce<Level>((champ, contender) => {
			if (champ.created_at > contender.created_at) {
				return champ;
			} else {
				return contender;
			}
		}, levels[0]);

	const mostRecentlyUpdatedLevel =
		levels.length > 2 &&
		levels.reduce<Level>((champ, contender) => {
			if (!contender.updated_at) {
				return champ;
			}

			if (!champ.updated_at) {
				return contender;
			}

			if (champ.updated_at > contender.updated_at) {
				return champ;
			} else {
				return contender;
			}
		}, levels[0]);

	const restOfLevels = levels.filter(
		(l) => l !== newestLevel && l !== mostRecentlyUpdatedLevel
	);

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
							{(newestLevel || mostRecentlyUpdatedLevel) && (
								<div className="bg-gray-600 -mx-4 p-4 my-10">
									{newestLevel && (
										<>
											<h3 className="m-0 mb-2 text-xl font-bold">
												Newest Level
											</h3>
											<LevelRow
												level={newestLevel}
												isBuildingSave={isBuildingSave}
												isChosen={chosenLevels.includes(newestLevel)}
												areFilesReady={allFilesReady}
												onChosenChange={(newChosen) => {
													if (
														newChosen &&
														chosenLevels.length < MAX_LEVELS_IN_SAVE
													) {
														setChosenLevels((cl) => cl.concat(newestLevel));
													} else {
														setChosenLevels((cl) =>
															cl.filter((cll) => cll !== newestLevel)
														);
													}
												}}
												onLoadRomClick={() => setShowFileLoaderModal(true)}
											/>
										</>
									)}
									{mostRecentlyUpdatedLevel &&
										mostRecentlyUpdatedLevel !== newestLevel && (
											<>
												<h3
													className={clsx('m-0 mb-2 text-xl font-bold', {
														'mt-4': !!newestLevel,
													})}
												>
													Recently Updated
												</h3>
												<LevelRow
													level={mostRecentlyUpdatedLevel}
													isBuildingSave={isBuildingSave}
													isChosen={chosenLevels.includes(
														mostRecentlyUpdatedLevel
													)}
													areFilesReady={allFilesReady}
													onChosenChange={(newChosen) => {
														if (
															newChosen &&
															chosenLevels.length < MAX_LEVELS_IN_SAVE
														) {
															setChosenLevels((cl) =>
																cl.concat(mostRecentlyUpdatedLevel)
															);
														} else {
															setChosenLevels((cl) =>
																cl.filter(
																	(cll) => cll !== mostRecentlyUpdatedLevel
																)
															);
														}
													}}
													onLoadRomClick={() => setShowFileLoaderModal(true)}
												/>
											</>
										)}
								</div>
							)}
							<div className="flex flex-row gap-x-2 items-center mb-4 mt-12">
								<div>Sort by: </div>
								<Button
									disabled={sortType === 'likes'}
									onClick={onSortTypeChange}
								>
									Most liked
								</Button>{' '}
								<Button
									disabled={sortType === 'new'}
									onClick={onSortTypeChange}
								>
									Newest
								</Button>
							</div>
							<div className="space-y-8">
								{restOfLevels.map((l) => (
									<LevelRow
										key={l.id}
										level={l}
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
					{body}
				</div>
			</Root>
		</>
	);
}

export { LevelsPage, MAX_LEVELS_IN_SAVE };
