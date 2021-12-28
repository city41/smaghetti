import clsx from 'clsx';
import React, { useState } from 'react';
import { downloadSetOfLevelsAsSaveFile } from '../../../levelData/downloadLevelAsSaveFile';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { OtherFilesState } from '../../FileLoader/fileLoaderSlice';
import { HowToUseDownloadModal } from '../../HowToUseDownloadModal';
import { Root } from '../../layout/Root';
import { LoadingBar } from '../../LoadingBar';
import { LevelRow } from '../LevelsPage/LevelRow/LevelRow';
import { SaveFileList } from './SaveFileList';
import { LevelWithVoting } from './ConnectedLevels2Page';
import { Menu, MenuEntry } from './Menu';
import { Pagination } from './Pagination';

export const MAX_LEVELS_IN_SAVE = 32;

const categories = [
	{ title: 'Newest', subtitle: null, slug: 'newest' },
	{ title: 'Popular', subtitle: null, slug: 'popular' },
	{ title: 'By Tag', subtitle: 'not implemented yet', slug: 'by-tag' },
	{
		title: 'Coins',
		subtitle: 'These levels have ace coins and/or e-coins for you to seek out',
		slug: 'coins',
	},
	{
		title: "Dev's Favs",
		subtitle:
			"Hi I'm Matt and I am making Smaghetti. These are some of my favorite levels.",
		slug: 'dev-favs',
	},
] as const;

type CategorySlug = typeof categories[number]['slug'];

type PublicLevels2PageProps = {
	currentSlug: CategorySlug;
	onSlugClick: (newSlug: CategorySlug) => void;
};

type InternalLevels2PageProps = {
	allFilesReady: boolean;
	emptySaveFileState: OtherFilesState;
	loadingState: 'loading' | 'error' | 'success';
	levels: LevelWithVoting[];
	totalCount: number;
	pageSize: number;
	currentPage: number;
	onNextClick: () => void;
	onPreviousClick: () => void;
	onVoteClick: (level: LevelWithVoting) => void;
};

function Levels2Page({
	allFilesReady,
	emptySaveFileState,
	loadingState,
	levels,
	totalCount,
	pageSize,
	currentSlug,
	onSlugClick,
	currentPage,
	onNextClick,
	onPreviousClick,
	onVoteClick,
}: PublicLevels2PageProps & InternalLevels2PageProps) {
	const [showFileLoaderModal, setShowFileLoaderModal] = useState(false);
	const [isBuildingSave, setIsBuildingSave] = useState(false);
	const [chosenLevels, setChosenLevels] = useState<Level[]>([]);
	const [showDownloadHelp, setShowDownloadHelp] = useState(false);

	const currentCategory = categories.find((c) => c.slug === currentSlug);

	function downloadSave(levels: Level[]) {
		downloadSetOfLevelsAsSaveFile(levels, 'smaghetti');
		setShowDownloadHelp(true);
		setIsBuildingSave(false);
		setChosenLevels([]);
	}

	return (
		<>
			<FileLoaderModal
				isOpen={showFileLoaderModal && !allFilesReady}
				onRequestClose={() => setShowFileLoaderModal(false)}
			/>
			<HowToUseDownloadModal
				isOpen={showDownloadHelp}
				onRequestClose={() => setShowDownloadHelp(false)}
			/>
			<Root metaDescription="" title="Levels">
				<div className="max-w-2xl mx-auto pt-16 flex flex-col h-full">
					<h1 className="font-bold text-2xl text-center">Community Levels</h1>
					<p className="mt-2 mb-16 text-gray-400 text-sm text-center mx-24">
						Want your level to show up here? Click on the &quot;publish&quot;
						button when looking at all your levels in the editor.
					</p>
					<Menu>
						{categories.map((c) => {
							return (
								<MenuEntry
									key={c.slug}
									current={currentSlug === c.slug}
									onClick={() => {
										onSlugClick(c.slug);
									}}
								>
									{c.title}
								</MenuEntry>
							);
						})}
					</Menu>
					{!!currentCategory?.subtitle && (
						<p className="mt-12 text-center text-sm w-full">
							{currentCategory.subtitle}
						</p>
					)}
					<div
						className={clsx('flex-1 mb-8 flex flex-col gap-y-8', {
							'mt-4': !!currentCategory?.subtitle,
							'mt-8': !currentCategory?.subtitle,
						})}
					>
						{loadingState === 'loading' && <LoadingBar percent={100} />}
						{loadingState === 'success' && (
							<>
								{levels.map((l) => (
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
										onLoadRomClick={() => {
											setShowFileLoaderModal(true);
										}}
										currentUserVoted={l.currentUserVoted}
										voteCount={l.voteCount}
										onVoteClick={() => onVoteClick(l)}
										isVoting={!!l.loading}
									/>
								))}
							</>
						)}
					</div>
					{loadingState === 'success' && (
						<Pagination
							currentPage={currentPage}
							onNextClick={onNextClick}
							onPreviousClick={onPreviousClick}
							totalCount={totalCount}
							pageSize={pageSize}
						/>
					)}
				</div>
			</Root>
			<SaveFileList
				emptySaveFileState={emptySaveFileState}
				className="ml-12 fixed bottom-0"
				style={{ minHeight: '3rem' }}
				chosenLevelCount={chosenLevels.length}
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
		</>
	);
}

export { Levels2Page, categories };
export type { PublicLevels2PageProps, CategorySlug };
