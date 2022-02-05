import React, { useState } from 'react';
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

const hexTreeOverride =
	typeof window !== 'undefined' &&
	window.location.search.includes('hextreecat');

if (process.env.NODE_ENV !== 'production' || hexTreeOverride) {
	tabs.push({ title: 'HexTree', category: 'hextree' });
}

type AllEntriesType = Record<
	PaletteCategory | 'unfinished',
	Partial<Record<PaletteSubcategory | 'misc', PaletteChoiceModalEntry[]>>
>;

const allEntries: AllEntriesType = tabs.reduce<AllEntriesType>(
	(building, t) => {
		const tabEntries = Object.entries(entityMap)
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
	'enemy-airship',
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
	'enemy-airship': 'airship',
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
			<p>
				Want to help get these working? Let me know on{' '}
				<a
					className="text-blue-700"
					target="_blank"
					rel="noreferrer"
					href="https://discord.gg/wBVE4yyWhM"
				>
					Discord
				</a>
				,{' '}
				<a
					className="text-blue-700"
					target="_blank"
					rel="noreferrer"
					href="https://github.com/city41/smaghetti/discussions"
				>
					GitHub
				</a>
				, or{' '}
				<a
					className="text-blue-700"
					target="_blank"
					rel="noreferrer"
					href="mailto:matt.e.greer@gmail.com"
				>
					email me
				</a>
				.
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
	const [currentTabIndex, setCurrentTabIndex] = useState(0);
	const [
		currentEntry,
		setCurrentEntry,
	] = useState<PaletteChoiceModalEntry | null>(null);

	const currentEntries = allEntries[tabs[currentTabIndex].category] || {};

	return (
		<Modal
			className={clsx(styles.modal, 'overflow-y-hidden')}
			noAnimation={true}
			isOpen={isOpen}
			onRequestClose={onCancel}
			onXClick={onCancel}
		>
			<div className={styles.root}>
				<div className="flex flex-col">
					<div className={clsx(tabStyles.tabs, '-mt-3')}>
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
					</div>
					{tabs[currentTabIndex].category === 'unfinished' && (
						<UnfinishedDisclaimer />
					)}
					<div className={clsx(styles.currentEntries, 'thinScrollbar')}>
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
							<div className="h-full grid place-items-center">
								nothing here!
							</div>
						)}
					</div>
				</div>

				<div className="flex flex-col text-white rounded-br-xl rounded-tr-xl px-4 py-8 -mt-3 -mb-8 -mr-4 bg-gray-900">
					{currentEntry && (
						<h2 className="font-bold mb-4">{currentEntry.info.title}</h2>
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
				<div className="text-xs text-center text-gray-300 -mb-2 pt-1">
					Hold shift when adding to keep chooser open
				</div>
			</div>
		</Modal>
	);
}

export { PaletteChoiceModal };
export type { PaletteChoiceModalProps };
