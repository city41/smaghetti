import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import groupBy from 'lodash/groupBy';

import { Modal } from '../../../Modal';
import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';

import styles from './PaletteChoiceModal.module.css';
import tabStyles from '../../../../styles/tabs.module.css';
import { entityMap, EntityType } from '../../../../entities/entityMap';
import {
	Entity,
	PaletteCategory,
	PaletteSubcategory,
} from '../../../../entities/types';
import { IconCancel, IconExperiment } from '../../../../icons';

type PaletteChoiceModalProps = {
	isOpen: boolean;
	validEntityTypes: EntityType[];
	onEntryAdded: (addedEntry: EntityType, keepOpen: boolean) => void;
	onEntryRemoved: (removedEntry: EntityType) => void;
	onCancel: () => void;
};

type PaletteChoiceModalEntry = {
	entry: EntityType;
	info: Entity['paletteInfo'];
};

type TabType = {
	title: string;
	category: PaletteCategory;
};

const tabs: TabType[] = [
	{ title: 'Terrain', category: 'terrain' },
	{ title: 'Enemies', category: 'enemy' },
	{ title: 'Objects', category: 'object' },
	{ title: 'Gizmos', category: 'gizmo' },
	{ title: 'Power Ups', category: 'power-up' },
	{ title: 'Warps', category: 'transport' },
	{ title: 'Decorations', category: 'decoration' },
	{ title: 'Meta', category: 'meta' },
	{ title: 'Unfinished', category: 'unfinished' },
];

const binaryOverride =
	typeof window !== 'undefined' && window.location.search.includes('binarycat');

if (process.env.NODE_ENV !== 'production' || binaryOverride) {
	tabs.push({ title: 'Binary', category: 'binary' });
}

type AllEntriesType = Record<
	PaletteCategory | 'unfinished',
	Partial<Record<PaletteSubcategory | 'misc', PaletteChoiceModalEntry[]>>
>;

const allEntriesFlat = Object.entries(entityMap);

const allEntries: AllEntriesType = tabs.reduce<AllEntriesType>(
	(building, t) => {
		const tabEntries = allEntriesFlat
			.filter(
				(e) =>
					(e[1].paletteCategory ?? 'unfinished') === t.category &&
					e[0] !== 'Player'
			)
			.map((e) => {
				return {
					entry: e[0] as EntityType,
					info: e[1].paletteInfo,
				};
			});

		const groups = groupBy(tabEntries, (te) => te.info.subCategory ?? 'misc');

		building[t.category] = groups;
		return building;
	},
	{} as AllEntriesType
);

function searchEntries(search: string): PaletteChoiceModalEntry[] {
	const lowerSearch = search.toLowerCase();

	const matchingEntries = allEntriesFlat.filter(([_, entityDef]) => {
		return entityDef.paletteInfo.title.toLowerCase().includes(lowerSearch);
	});

	return matchingEntries.map((e) => {
		return {
			entry: e[0] as EntityType,
			info: e[1].paletteInfo,
		};
	});
}

function isCompatible(
	type: EntityType,
	validEntityTypes: EntityType[]
): boolean {
	return validEntityTypes.includes(type);
}

const paletteSubCategoriesOrder: Array<PaletteSubcategory | 'misc'> = [
	'terrain-basic',
	'terrain-damaging',
	'terrain-water',
	'terrain-winter',
	'terrain-bowsers-army',
	'terrain-sky',
	'terrain-large',
	'terrain-checkered',
	'terrain-giant',
	'terrain-desert',
	'enemy-common',
	'enemy-pixel-positioned',
	'enemy-piranha',
	'enemy-fortress',
	'enemy-desert',
	'enemy-water',
	'enemy-winter',
	'enemy-bowsers-army',
	'enemy-bro',
	'enemy-giant',
	'enemy-generator',
	'enemy-boss',
	'gizmo-platform',
	'misc',
];

const paletteSubCategoryLabel: Record<PaletteSubcategory | 'misc', string> = {
	'terrain-basic': 'basic',
	'terrain-water': 'water',
	'terrain-damaging': 'damaging',
	'terrain-winter': 'winter',
	'terrain-bowsers-army': "bowser's army",
	'terrain-sky': 'sky',
	'terrain-large': 'big things',
	'terrain-checkered': 'checkered',
	'terrain-giant': 'giant land',
	'terrain-desert': 'desert',
	'enemy-common': 'common',
	'enemy-pixel-positioned': 'pixel positioned',
	'enemy-piranha': 'piranhas',
	'enemy-bowsers-army': "bowser's army",
	'enemy-fortress': 'fortress',
	'enemy-desert': 'desert',
	'enemy-water': 'water',
	'enemy-winter': 'winter',
	'enemy-bro': 'bros',
	'enemy-giant': 'giants',
	'enemy-boss': 'bosses',
	'enemy-generator': 'generators',
	'gizmo-platform': 'platforms',
	misc: 'the rest...',
};

function subcategoryComparator(a: PaletteSubcategory, b: PaletteSubcategory) {
	return (
		paletteSubCategoriesOrder.indexOf(a) - paletteSubCategoriesOrder.indexOf(b)
	);
}

function getCompatSortComparator(validEntityTypes: EntityType[]) {
	return (a: PaletteChoiceModalEntry, b: PaletteChoiceModalEntry) => {
		const aCompat = isCompatible(a.entry, validEntityTypes);
		const bCompat = isCompatible(b.entry, validEntityTypes);

		if (aCompat && !bCompat) {
			return -1;
		}

		if (bCompat && !aCompat) {
			return 1;
		}

		return a.info.title.localeCompare(b.info.title);
	};
}

function UnfinishedDisclaimer() {
	return (
		<div className="bg-red-200 text-black p-2 space-y-2 text-sm">
			<p>
				These are entities that are not ready for use yet. There is something
				about them that needs to be figured out before they can be used for
				real.
			</p>
			<p className="font-bold text-red-800">
				You can add them to your level and try them out, but they will only be
				temporary. They get removed when you save your level.
			</p>
		</div>
	);
}

function PaletteChoiceModal({
	isOpen,
	validEntityTypes,
	onEntryAdded,
	onCancel,
}: PaletteChoiceModalProps) {
	const [isSearching, setIsSearching] = useState(false);
	const [currentSearch, setCurrentSearch] = useState('');
	const [currentTabIndex, setCurrentTabIndex] = useState(0);
	const [
		currentEntry,
		setCurrentEntry,
	] = useState<PaletteChoiceModalEntry | null>(null);

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === '/' && !isSearching) {
				e.preventDefault();
				e.stopPropagation();

				setIsSearching(true);
				return;
			}

			if (isSearching) {
				e.preventDefault();
				e.stopPropagation();

				if (e.key === 'Escape' || e.key === '/') {
					setCurrentSearch('');
					setIsSearching(false);
				} else if (e.key.length === 1) {
					setCurrentSearch((s) => (s += e.key));
				} else if (e.key === 'Backspace') {
					if (currentSearch.length === 0) {
						setIsSearching(false);
					} else {
						setCurrentSearch((s) => {
							return s.substring(0, s.length - 1);
						});
					}
				}
			}
		}

		document.addEventListener('keydown', handleKeyDown, true);

		return () => document.removeEventListener('keydown', handleKeyDown, true);
	}, [currentSearch, setCurrentSearch, isSearching, setIsSearching]);

	const experimentalIcon = (
		<IconExperiment className="w-5 h-5 p-0.5 bg-red-600 text-white" />
	);

	const deprecatedIcon = (
		<IconCancel className="w-5 h-5 p-0.5 bg-red-600 text-white" />
	);

	const header = isSearching ? (
		<li>
			<div className="flex flex-row gap-x-2 items-center">
				<div className="font-normal">search:</div>
				<div className="font-bold">{currentSearch}</div>
			</div>
		</li>
	) : (
		<>
			{tabs.map((t, i) => (
				<li
					key={t.category}
					className={clsx({
						[tabStyles.currentTab]: i === currentTabIndex,
						'text-red-200': t.category === 'unfinished',
					})}
					onClick={() => {
						setCurrentTabIndex(i);
						setCurrentEntry(null);
					}}
				>
					{t.title}
				</li>
			))}
		</>
	);

	let entries;

	if (isSearching) {
		if (currentSearch.trim() === '') {
			entries = (
				<div className="grid place-items-center h-full text-gray-400">
					type to search for entities
				</div>
			);
		} else if (currentSearch.trim()) {
			const foundEntries = searchEntries(currentSearch);

			if (foundEntries.length === 0) {
				entries = (
					<div className="grid place-items-center h-full text-gray-400">
						<div>
							no matches found for &quot;
							<span className="text-white">{currentSearch}</span>&quot;
						</div>
					</div>
				);
			} else {
				entries = (
					<div className="flex flex-row flex-wrap">
						{foundEntries
							.sort(getCompatSortComparator(validEntityTypes))
							.map((e) => {
								return (
									<PaletteEntryCmp
										key={e.entry}
										isCurrent={currentEntry === e}
										entry={e.entry}
										onClick={() => setCurrentEntry(e)}
										buttonsOnHover
										showAdd
										showRemove={false}
										incompatible={!isCompatible(e.entry, validEntityTypes)}
										onAddClick={(shiftHeld) => {
											onEntryAdded(e.entry, shiftHeld);
										}}
									/>
								);
							})}
					</div>
				);
			}
		}
	} else {
		const currentEntries = allEntries[tabs[currentTabIndex].category] || {};
		entries = (
			<>
				{(Object.keys(currentEntries) as PaletteSubcategory[])
					.sort(subcategoryComparator)
					.map((groupKey) => {
						return (
							<div key={groupKey}>
								{Object.keys(currentEntries).length > 1 && (
									<h3>{paletteSubCategoryLabel[groupKey]}</h3>
								)}
								<div className="flex flex-row flex-wrap">
									{currentEntries[groupKey]
										?.sort(getCompatSortComparator(validEntityTypes))
										.map((e) => {
											return (
												<PaletteEntryCmp
													key={e.entry}
													isCurrent={currentEntry === e}
													entry={e.entry}
													onClick={() => setCurrentEntry(e)}
													buttonsOnHover
													showAdd
													showRemove={false}
													incompatible={
														!isCompatible(e.entry, validEntityTypes)
													}
													onAddClick={(shiftHeld) => {
														onEntryAdded(e.entry, shiftHeld);
													}}
												/>
											);
										})}
								</div>
							</div>
						);
					})}
				{Object.keys(currentEntries).length === 0 && (
					<div className="h-full grid place-items-center">nothing here!</div>
				)}
			</>
		);
	}

	const body = (
		<div className={styles.root}>
			<div className="flex flex-col">
				<ul className={clsx(tabStyles.tabs, '-mt-3')}>{header}</ul>
				{tabs[currentTabIndex].category === 'unfinished' && (
					<UnfinishedDisclaimer />
				)}
				<div className={clsx(styles.currentEntries, 'thinScrollbar')}>
					{entries}
				</div>
			</div>

			<div className="flex flex-col text-white rounded-br-xl rounded-tr-xl px-4 py-8 -mt-3 -mb-8 -mr-4 bg-gray-900">
				{currentEntry && (
					<h2 className="font-bold mb-4 flex flex-row items-center gap-x-2">
						{currentEntry &&
							entityMap[currentEntry.entry].experimental &&
							experimentalIcon}
						{currentEntry &&
							entityMap[currentEntry.entry].deprecated &&
							deprecatedIcon}
						{currentEntry.info.title}
					</h2>
				)}
				{currentEntry && (
					<div className="space-y-4">
						{currentEntry.info.description}
						{currentEntry && currentEntry.info.helpId && (
							<>
								{' '}
								<a
									className="text-blue-500 hover:underline"
									href={`/tips#${currentEntry.info.helpId}`}
									target="_blank"
									rel="noreferrer"
								>
									more info
								</a>
							</>
						)}
					</div>
				)}
				{!!(
					currentEntry &&
					(currentEntry.info?.warning ??
						entityMap[currentEntry.entry].deprecated)
				) && (
					<div className="mt-4 bg-red-100 text-red-700 p-2 text-xs">
						{currentEntry.info?.warning ??
							entityMap[currentEntry.entry].deprecated}
					</div>
				)}
				{currentEntry && !isCompatible(currentEntry.entry, validEntityTypes) && (
					<div className="space-y-3">
						<div className="mt-4 text-red-500 font-bold">
							Incompatible with other added entities
						</div>
						<a
							className="text-xs text-blue-500 hover:underline"
							href={`/compatibility/${currentEntry.entry}`}
							target="_blank"
							rel="noreferrer"
						>
							see compatibility chart
						</a>
					</div>
				)}
				{currentEntry && isCompatible(currentEntry.entry, validEntityTypes) && (
					<>
						<div className="flex-1" />
						<a
							className="text-xs text-blue-500 hover:underline"
							href={`/compatibility/${currentEntry.entry}`}
							target="_blank"
							rel="noreferrer"
						>
							compatibility chart
						</a>
					</>
				)}
			</div>
			<div className="flex flex-row justify-between items-center text-xs text-gray-300 -mb-2 pt-1 px-4">
				<div>
					{isSearching ? (
						<>
							Press <span className="font-bold">esc</span> or{' '}
							<span className="font-bold">/</span> to exit search
						</>
					) : (
						<>
							Press <span className="font-bold">/</span> to search
						</>
					)}
				</div>
				<div> Hold shift when adding to keep chooser open.</div>
				<div className="flex flex-row items-center gap-x-1">
					{experimentalIcon}
					<div>experimental, its behaviour may change in the future</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			className={clsx(styles.modal, 'overflow-y-hidden')}
			noAnimation={true}
			isOpen={isOpen}
			onRequestClose={onCancel}
			onXClick={onCancel}
		>
			{body}
		</Modal>
	);
}

export { PaletteChoiceModal };
export type { PaletteChoiceModalProps };
