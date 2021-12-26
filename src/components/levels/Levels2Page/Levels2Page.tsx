import clsx from 'clsx';
import React, { useState } from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { Root } from '../../layout/Root';
import { LoadingBar } from '../../LoadingBar';
import { LevelRow } from '../LevelsPage/LevelRow/LevelRow';
import { LevelWithVoting } from './ConnectedLevels2Page';
import { Menu, MenuEntry } from './Menu';
import { Pagination } from './Pagination';

const categories = [
	{ title: 'Newest', subtitle: null, slug: 'newest' },
	{ title: 'Popular', subtitle: null, slug: 'popular' },
	// { title: 'By Tag', slug: 'by-tag' },
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
	loadingState: 'loading' | 'error' | 'success';
	levels: LevelWithVoting[];
	currentPage: number;
	onNextClick: () => void;
	onPreviousClick: () => void;
	onVoteClick: (level: LevelWithVoting) => void;
};

function Levels2Page({
	allFilesReady,
	loadingState,
	levels,
	currentSlug,
	onSlugClick,
	currentPage,
	onNextClick,
	onPreviousClick,
	onVoteClick,
}: PublicLevels2PageProps & InternalLevels2PageProps) {
	const [showFileLoaderModal, setShowFileLoaderModal] = useState(false);

	const currentCategory = categories.find((c) => c.slug === currentSlug);

	return (
		<>
			<FileLoaderModal
				isOpen={showFileLoaderModal && !allFilesReady}
				onRequestClose={() => setShowFileLoaderModal(false)}
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
										isBuildingSave={false}
										isChosen={false}
										areFilesReady={allFilesReady}
										onChosenChange={(_newChosen) => {}}
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
						/>
					)}
				</div>
			</Root>
		</>
	);
}

export { Levels2Page, categories };
export type { PublicLevels2PageProps, CategorySlug };
