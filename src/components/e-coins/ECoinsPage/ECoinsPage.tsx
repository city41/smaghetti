import clsx from 'clsx';
import React, { useState } from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { Root } from '../../layout/Root';
import { LoadingBar } from '../../LoadingBar';
import { Pagination } from '../../levels/Levels2Page/Pagination';
import {
	CategoryUserOrder,
	userOrders,
} from '../../levels/Levels2Page/categories';
import { Menu, MenuEntry } from '../../levels/Levels2Page/Menu';

type PublicECoinsPageProps = {
	currentOrder: CategoryUserOrder;
	onUserOrderClick: (newOrder: CategoryUserOrder) => void;
};

type InternalECoinsPageProps = {
	allFilesReady: boolean;
	loadingState: 'loading' | 'error' | 'success';
	levels: Level[];
	totalCount: number;
	pageSize: number;
	currentPage: number;
	onNextClick: () => void;
	onPreviousClick: () => void;
};

function ECoinsPage({
	allFilesReady,
	loadingState,
	levels,
	totalCount,
	pageSize,
	currentOrder,
	currentPage,
	onUserOrderClick,
	onNextClick,
	onPreviousClick,
}: PublicECoinsPageProps & InternalECoinsPageProps) {
	const [showFileLoaderModal, setShowFileLoaderModal] = useState(false);

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
					<div className={clsx('flex-1 mb-8 flex flex-col gap-y-8')}>
						{loadingState === 'loading' && <LoadingBar percent={100} />}
						{loadingState === 'success' && (
							<>
								{levels.length === 0 && (
									<p className="text-center">No E-Coins found</p>
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
		</>
	);
}

export { ECoinsPage };
export type { PublicECoinsPageProps };
