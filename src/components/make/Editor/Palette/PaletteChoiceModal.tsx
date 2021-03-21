import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';

import { Modal } from '../../../Modal';
import { PaletteEntry } from '../../editorSlice';
import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';
import { ExternalLink } from '../../../ExternalLink';

import styles from './PaletteChoiceModal.module.css';

type PaletteChoiceModalProps = {
	open: boolean;
	currentPaletteEntries: PaletteEntry[];
	onEntryAdded: (addedEntry: PaletteEntry) => void;
	onEntryRemoved: (removedEntry: PaletteEntry) => void;
	onCancel: () => void;
};

const tabs = ['Objects', 'Enemies', 'Items', 'Gizmos', 'Power Ups'];

type PaletteChoiceModalEntry = {
	entry: PaletteEntry;
	info: { title: string; description: string; limitationsId?: string };
};

const objects: PaletteChoiceModalEntry[] = [
	{
		entry: {
			brushMode: 'tile',
			type: 'Brick',
		},
		info: {
			title: 'Brick',
			description: 'Flexible, can be terrain, smashed, and contain items',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'Coin',
		},
		info: {
			title: 'Coin',
			description: 'The ever present coin',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'QuestionBlock',
		},
		info: {
			title: 'Question Block',
			description: 'Can contain a coin, power up or other things',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'CardSlotMachine',
		},
		info: {
			title: 'Card Slot Machine',
			description:
				'Required to be in your level somewhere. Getting the card ends the level.',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'SpringBoard',
		},
		info: {
			title: 'Spring Board',
			description: 'Bounce high. Pick it up and move it if needed.',
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
	{
		entry: {
			brushMode: 'entity',
			type: 'GreenKoopaTroopa',
		},
		info: {
			title: 'Green Koopa Troopa',
			description: 'Walks in a straight line, only turns if hits a wall',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'GreenParaTroopa',
		},
		info: {
			title: 'Green Para Troopa',
			description: 'Bounces along',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'RedKoopaTroopa',
		},
		info: {
			title: 'Red Koopa Troopa',
			description: 'Turns around at cliffs',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'RedParaTroopa',
		},
		info: {
			title: 'Red Para Troopa',
			description: 'Flies up and down',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'Spiny',
		},
		info: {
			title: 'Spiny',
			description: '',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'BuzzyBeetle',
		},
		info: {
			title: 'Buzzy Beetle',
			description: '',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'Lakitu',
		},
		info: {
			title: 'Lakitu',
			description: "Dammit it's Lakitu!",
		},
	},
];

const items: PaletteChoiceModalEntry[] = [];

const gizmos: PaletteChoiceModalEntry[] = [];

const powerUps: PaletteChoiceModalEntry[] = [
	{
		entry: {
			brushMode: 'entity',
			type: 'Mushroom',
		},
		info: {
			title: 'Mushroom',
			description: '',
		},
	},
];

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

const entries = [objects, enemies, items, gizmos, powerUps];

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
			className={styles.modal}
			noAnimation={true}
			isOpen={open}
			onRequestClose={onCancel}
			onXClick={onCancel}
		>
			<div className={styles.root}>
				<div className={styles.tabContainer}>
					<div className={styles.tabs}>
						{tabs.map((t, i) => (
							<li
								key={t}
								className={clsx({ [styles.currentTab]: i === currentTabIndex })}
								onClick={() => {
									setCurrentTabIndex(i);
									setCurrentEntryIndex(0);
								}}
							>
								{t}
							</li>
						))}
					</div>
					<div className={styles.currentEntries}>
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
									buttonsOnHover
									showAdd
									showRemove={false}
									onAddClick={() => {
										onEntryAdded(ce.entry);
									}}
								/>
							);
						})}
						{currentEntries.length === 0 && (
							<div className={styles.noEntries}>
								No {tabs[currentTabIndex].toLowerCase()} yet!
							</div>
						)}
					</div>
				</div>

				<div className={styles.details}>
					{currentEntry && (
						<h2 className="font-bold mb-4">{currentEntry.info.title}</h2>
					)}
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
