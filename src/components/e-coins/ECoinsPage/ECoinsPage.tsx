import clsx from 'clsx';
import React from 'react';
import { Root } from '../../layout/Root';
import { LoadingBar } from '../../LoadingBar';
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
};

function ECoinsPage({
	loadingState,
	levels,
	currentOrder,
	onUserOrderClick,
}: PublicECoinsPageProps & InternalECoinsPageProps) {
	return (
		<Root metaDescription="Smaghetti's art gallery :)" title="Custom E-Coins">
			<div className="max-w-2xl mx-auto pt-16 flex flex-col h-full">
				<h1 className="font-bold text-2xl text-center">Community E-Coins</h1>
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
						<LoadingBar className="flex-1" percent={-1} />
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
			</div>
		</Root>
	);
}

export { ECoinsPage };
export type { PublicECoinsPageProps };
