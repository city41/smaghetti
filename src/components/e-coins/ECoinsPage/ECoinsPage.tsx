import clsx from 'clsx';
import React from 'react';
import { Root } from '../../layout/Root';
import { LoadingBar } from '../../LoadingBar';
import { Pagination } from '../../levels/Levels2Page/Pagination';
import {
	CategoryUserOrder,
	userOrders,
} from '../../levels/Levels2Page/categories';
import { Menu, MenuEntry } from '../../levels/Levels2Page/Menu';
import { ECoinEntry } from './ECoinEntry';

type PublicECoinsPageProps = {
	currentOrder: CategoryUserOrder;
	onUserOrderClick: (newOrder: CategoryUserOrder) => void;
};

type InternalECoinsPageProps = {
	loadingState: 'loading' | 'error' | 'success';
	levels: Level[];
	totalCount: number;
	pageSize: number;
	currentPage: number;
	onNextClick: () => void;
	onPreviousClick: () => void;
};

function ECoinsPage({
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
	return (
		<Root metaDescription="Smaghetti's art gallery :)" title="Custom E-Coins">
			<div className="max-w-2xl mx-auto pt-16 flex flex-col h-full">
				<h1 className="font-bold text-2xl text-center">Community E-Coins</h1>
				<p className="mt-2 mb-16 text-gray-400 text-sm text-center mx-24">
					Want your coin to show up here? Make a level with a custom E-Coin in
					it (you gotta draw something!) then click on the &quot;publish&quot;
					button when looking at all your levels in the editor.
				</p>
				{!!currentOrder && levels.length > 0 && (
					<Menu className="grid grid-cols-2 w-1/2 mx-auto mb-12">
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
					className={clsx(
						'flex-1 mb-8 flex flex-row flex-wrap gap-x-4 gap-y-4 w-full'
					)}
				>
					{loadingState === 'loading' && (
						<LoadingBar className="flex-1" percent={100} />
					)}
					{loadingState === 'success' && (
						<>
							{levels.length === 0 && (
								<p className="text-center">No E-Coins found</p>
							)}
							{levels.map((l) => {
								return <ECoinEntry key={l.id} level={l} />;
							})}
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
	);
}

export { ECoinsPage };
export type { PublicECoinsPageProps };
