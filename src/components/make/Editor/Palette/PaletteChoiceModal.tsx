import React, { ReactNode, useState } from 'react';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';

import { Modal } from '../../../Modal';
import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';

import styles from './PaletteChoiceModal.module.css';
import tabStyles from '../../../../styles/tabs.module.css';
import { entityMap, EntityType } from '../../../../entities/entityMap';
import { Entity } from '../../../../entities/types';

type PaletteChoiceModalProps = {
	isOpen: boolean;
	currentPaletteEntries: EntityType[];
	validEntityTypes: EntityType[];
	onEntryAdded: (addedEntry: EntityType) => void;
	onEntryRemoved: (removedEntry: EntityType) => void;
	onCancel: () => void;
};

type PaletteChoiceModalEntry = {
	entry: EntityType;
	info: { title: string; description?: ReactNode; warning?: ReactNode };
};

type TabType = {
	title: string;
	category: Required<Entity>['paletteCategory'];
};

const devTabs: TabType[] = [{ title: 'Unfinished', category: 'unfinished' }];

const tabs: TabType[] = [
	{ title: 'Terrain', category: 'terrain' },
	{ title: 'Enemies', category: 'enemy' },
	{ title: 'Objects', category: 'object' },
	{ title: 'Gizmos', category: 'gizmo' },
	{ title: 'Power Ups', category: 'power-up' },
	{ title: 'Bosses', category: 'boss' },
	{ title: 'Warps', category: 'transport' },
	{ title: 'Decoration', category: 'decoration' },
	...(process.env.NODE_ENV === 'production' ? [] : devTabs),
];

const entries: PaletteChoiceModalEntry[][] = tabs.map((t) => {
	return Object.entries(entityMap)
		.filter((e) => (e[1].paletteCategory ?? 'unfinished') === t.category)
		.map((e) => {
			return {
				entry: e[0] as EntityType,
				info: e[1].paletteInfo,
			};
		});
});

function isCompatible(
	type: EntityType,
	validEntityTypes: EntityType[]
): boolean {
	return validEntityTypes.includes(type);
}

function getSortComparator(validEntityTypes: EntityType[]) {
	return (a: PaletteChoiceModalEntry, b: PaletteChoiceModalEntry) => {
		const aCompat = isCompatible(a.entry, validEntityTypes);
		const bCompat = isCompatible(b.entry, validEntityTypes);

		if (aCompat && !bCompat) {
			return -1;
		}

		if (bCompat && !aCompat) {
			return 1;
		}

		return a.entry.localeCompare(b.entry);
	};
}

function PaletteChoiceModal({
	isOpen,
	currentPaletteEntries,
	validEntityTypes,
	onEntryAdded,
	onCancel,
}: PaletteChoiceModalProps) {
	const [currentTabIndex, setCurrentTabIndex] = useState(0);
	const [currentEntryIndex, setCurrentEntryIndex] = useState(0);

	const currentEntries = entries[currentTabIndex] || [];
	const currentEntry = currentEntries[currentEntryIndex];

	return (
		<Modal
			className={styles.modal}
			noAnimation={true}
			isOpen={isOpen}
			onRequestClose={onCancel}
			onXClick={onCancel}
		>
			<div className={styles.root}>
				<div className={styles.tabContainer}>
					<div className={clsx(tabStyles.tabs, '-mt-3')}>
						{tabs.map((t, i) => (
							<li
								key={t.category}
								className={clsx({
									[tabStyles.currentTab]: i === currentTabIndex,
								})}
								onClick={() => {
									setCurrentTabIndex(i);
									setCurrentEntryIndex(0);
								}}
							>
								{t.title}
							</li>
						))}
					</div>
					<div className={styles.currentEntries}>
						{currentEntries
							.sort(getSortComparator(validEntityTypes))
							.map((ce, i) => {
								return (
									<PaletteEntryCmp
										key={ce.entry}
										className={clsx({
											faded: currentPaletteEntries.some((e) => isEqual(ce, e)),
										})}
										isCurrent={currentEntryIndex === i}
										entry={ce.entry}
										onClick={() => setCurrentEntryIndex(i)}
										buttonsOnHover
										showAdd
										showRemove={false}
										incompatible={!isCompatible(ce.entry, validEntityTypes)}
										onAddClick={() => {
											onEntryAdded(ce.entry);
										}}
									/>
								);
							})}
						{currentEntries.length === 0 && (
							<div className={styles.noEntries}>
								No {tabs[currentTabIndex].title.toLowerCase()} yet!
							</div>
						)}
					</div>
				</div>

				<div className={styles.details}>
					{currentEntry && (
						<h2 className="font-bold mb-4">{currentEntry.info.title}</h2>
					)}
					{currentEntry && (
						<div className="space-y-4">{currentEntry.info.description}</div>
					)}
					{currentEntry?.info?.warning && (
						<div className="mt-4 bg-red-100 text-red-700 p-2 text-xs">
							{currentEntry.info.warning}
						</div>
					)}
					{currentEntry && !isCompatible(currentEntry.entry, validEntityTypes) && (
						<div className="space-y-3">
							<div className="mt-4 text-red-500 font-bold">
								Incompatible with other added entities
							</div>
							<a
								className="text-xs text-blue-500"
								href={`/compatibility/${currentEntry.entry}`}
								target="_blank"
								rel="noreferrer"
							>
								see compatibility chart
							</a>
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
}

export { PaletteChoiceModal };
export type { PaletteChoiceModalProps };
