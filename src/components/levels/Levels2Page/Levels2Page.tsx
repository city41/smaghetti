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
import {
	categories,
	CategorySlug,
	CategoryUserOrder,
	userOrders,
} from './categories';
import { TagPicker } from './TagPicker';
import { MAX_LEVEL_DATA } from '../../../levelData/typesAndConstants';

export const MAX_LEVELS_IN_SAVE = MAX_LEVEL_DATA;

type PublicLevels2PageProps = {
	currentSlug: CategorySlug;
	currentOrder: CategoryUserOrder;
	tags?: string[];
	onSlugClick: (newSlug: CategorySlug) => void;
	onUserOrderClick: (newOrder: CategoryUserOrder) => void;
	onTagClick?: (clickedTag: string) => void;
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
	currentOrder,
	tags,
	onSlugClick,
	onUserOrderClick,
	onTagClick,
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
						<p className="my-8 text-center text-sm w-full">
							{currentCategory.subtitle.replace(
								'{count}',
								totalCount === 0 ? '...' : totalCount.toString()
							)}
						</p>
					)}
					{onTagClick && (
						<TagPicker
							className="mb-8"
							chosenTags={tags ?? []}
							onTagClick={onTagClick}
						/>
					)}
					{!!currentOrder && levels.length > 0 && (
						<Menu className="grid grid-cols-2 w-1/2 mx-auto mb-4">
							{userOrders.map((c) => {
								return (
									<MenuEntry
										key={c}
										current={currentOrder === c}
										onClick={() => {
											onUserOrderClick?.(c);
										}}
									>
										{c}
									</MenuEntry>
								);
							})}
						</Menu>
					)}
					<div
						className={clsx('flex-1 mb-8 flex flex-col gap-y-8', {
							'mt-4': !!currentCategory?.subtitle,
							'mt-8': !currentCategory?.subtitle,
						})}
					>
						{loadingState === 'loading' && <LoadingBar percent={-1} />}
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
								{levels.length === 0 && (
									<p className="text-center">
										{currentSlug === 'by-tag' && (!tags || tags.length === 0)
											? 'Please choose some tags above'
											: 'No matching levels found'}
									</p>
								)}
							</>
						)}
					</div>
					{loadingState === 'success' && levels.length > 0 && (
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
				className="bg-gray-600 border-l border-t border-r border-gray-200 ml-12 fixed bottom-0"
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

export { Levels2Page };
export type { PublicLevels2PageProps };
