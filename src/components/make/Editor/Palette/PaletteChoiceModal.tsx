import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';
import isEqual from 'lodash.isequal';

import { Modal } from '../../../Modal';
import { PaletteEntry } from '../../editorSlice';
import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';
import { ExternalLink } from '../../../ExternalLink';

type PaletteChoiceModalProps = {
	open: boolean;
	currentPaletteEntries: PaletteEntry[];
	onEntryAdded: (addedEntry: PaletteEntry) => void;
	onEntryRemoved: (removedEntry: PaletteEntry) => void;
	onCancel: () => void;
};

// const Root = styled.div`
// 	display: grid;
// 	grid-template-columns: 1fr 200px;
// 	min-height: 300px;
// 	max-height: 60vh;
// 	min-width: 800px;
// 	max-width: 60vw;
// `;
//
// const TabContainer = styled.div`
// 	display: grid;
// 	grid-template-rows: max-content 1fr;
// `;
//
// const Tabs = styled.ul`
// 	width: calc(100% + 6px);
// 	display: flex;
// 	flex-wrap: wrap;
// 	justify-content: space-between;
//
// 	flex-direction: row;
// 	list-style-type: none;
// 	padding: 0;
// 	margin: -20px 0 0 -6px;
// 	font-size: 14px;
// 	z-index: 100;
//
// 	& li {
// 		height: 40px;
// 		cursor: pointer;
// 		font-weight: bold;
// 		white-space: nowrap;
// 		display: grid;
// 		place-items: center;
// 		padding: 0 16px;
// 	}
//
// 	& .current {
// 		background-color: rgba(140, 180, 255, 0.8);
// 	}
// `;
//
// const CurrentEntries = styled.div`
// 	display: flex;
// 	flex-direction: row;
// 	flex-wrap: wrap;
// 	align-items: flex-start;
//
// 	padding-top: 24px;
//
// 	height: 300px;
// 	overflow-y: auto;
//
// 	& > * {
// 		margin: 8px;
// 	}
//
// 	& .faded {
// 		opacity: 0.25;
// 	}
// `;
//
// const NoEntries = styled.div`
// 	width: 100%;
// 	height: 100%;
// 	padding: 0;
// 	margin: 0;
//
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// `;
//
// const Details = styled.div`
// 	background-color: rgba(0, 0, 0, 0.5);
// 	color: white;
//
// 	border-bottom-right-radius: 8px;
// 	margin: -16px -16px -16px 0;
// 	padding: 16px 32px;
// `;

const tabs = [
	'Terrain',
	'Enemies',
	'Items',
	'Gizmos',
	'Electric Gizmos',
	'Power Ups',
];

type PaletteChoiceModalEntry = {
	entry: PaletteEntry;
	info: { title: string; description: string; limitationsId?: string };
};

const terrain: PaletteChoiceModalEntry[] = [
	{
		entry: {
			brushMode: 'tile',
			type: 'brick',
		},
		info: {
			title: 'Brick',
			description: 'Flexible, can be terrain, smashed, and contain items',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'coin',
		},
		info: {
			title: 'Coin',
			description: 'The ever present coin',
		},
	},
];

const enemies: PaletteChoiceModalEntry[] = [
	{
		entry: {
			brushMode: 'entity',
			type: 'Goomba',
		},
		info: {
			title: 'Goomba',
			description: '',
		},
	},
];

const items: PaletteChoiceModalEntry[] = [];

const gizmos: PaletteChoiceModalEntry[] = [];

const electricGizmos: PaletteChoiceModalEntry[] = [];

const powerUps: PaletteChoiceModalEntry[] = [];

type LimitationsLinkProps = {
	id: string;
};

// const LimitationsLinkRoot = styled.div`
// 	padding: 8px;
// 	margin-top: 32px;
// 	background-color: rgb(200 100 100);
// 	color: white;
// 	font-weight: bold;
// 	text-align: center;
//
// 	& a {
// 		display: block;
// 		color: blue;
// 		font-size: 0.9em;
// 		margin-top: 8px;
// 	}
// `;

const LimitationsLink: FunctionComponent<LimitationsLinkProps> = ({ id }) => {
	return (
		<div>
			this item has issues!
			<ExternalLink href={`/limitations/#${id}`}>learn more</ExternalLink>
		</div>
	);
};

const entries = [terrain, enemies, items, gizmos, electricGizmos, powerUps];

const PaletteChoiceModal: FunctionComponent<PaletteChoiceModalProps> = ({
	open,
	currentPaletteEntries,
	onEntryAdded,
	onCancel,
}) => {
	const [currentTabIndex, setCurrentTabIndex] = useState(0);
	const [currentEntryIndex, setCurrentEntryIndex] = useState(0);

	const currentEntries = entries[currentTabIndex] || [];
	const currentEntry = currentEntries[currentEntryIndex];

	return (
		<Modal
			noAnimation={true}
			isOpen={open}
			onRequestClose={onCancel}
			onXClick={onCancel}
		>
			<div>
				<div>
					<div>
						{tabs.map((t, i) => (
							<li
								key={t}
								className={clsx({ current: i === currentTabIndex })}
								onClick={() => {
									setCurrentTabIndex(i);
									setCurrentEntryIndex(0);
								}}
							>
								{t}
							</li>
						))}
					</div>
					<div>
						{currentEntries.map((ce, i) => {
							return (
								<PaletteEntryCmp
									key={`${ce.entry.brushMode}-${ce.entry.type}`}
									className={clsx({
										faded: currentPaletteEntries.some((e) => isEqual(ce, e)),
									})}
									isCurrent={currentEntryIndex === i}
									entry={ce.entry}
									onClick={() => setCurrentEntryIndex(i)}
									showAdd
									showRemove={false}
									onAddClick={() => {
										onEntryAdded(ce.entry);
									}}
								/>
							);
						})}
						{currentEntries.length === 0 && (
							<div>No {tabs[currentTabIndex].toLowerCase()} yet!</div>
						)}
					</div>
				</div>

				<div>
					{currentEntry && <h2>{currentEntry.info.title}</h2>}
					{currentEntry && <p>{currentEntry.info.description}</p>}
					{currentEntry?.info.limitationsId && (
						<LimitationsLink id={currentEntry.info.limitationsId} />
					)}
				</div>
			</div>
		</Modal>
	);
};

export { PaletteChoiceModal };
export type { PaletteChoiceModalProps };
