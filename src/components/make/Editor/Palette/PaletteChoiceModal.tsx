import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';

import { Modal } from '../../../Modal';
import { PaletteEntry } from '../../editorSlice';
import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';

import styles from './PaletteChoiceModal.module.css';
import tabStyles from '../../../../styles/tabs.module.css';

type PaletteChoiceModalProps = {
	open: boolean;
	currentPaletteEntries: PaletteEntry[];
	onEntryAdded: (addedEntry: PaletteEntry) => void;
	onEntryRemoved: (removedEntry: PaletteEntry) => void;
	onCancel: () => void;
};

type PaletteChoiceModalEntry = {
	entry: PaletteEntry;
	info: { title: string; description: string; limitationsId?: string };
};

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
			type: 'ShoeGoomba',
		},
		info: {
			title: 'Shoe Goomba',
			description: 'Kuribo is the Japanese name for Goombas',
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
			type: 'Bobomb',
		},
		info: {
			title: 'Bobomb',
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

const objects: PaletteChoiceModalEntry[] = [
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
			brushMode: 'tile',
			type: 'PSwitch',
		},
		info: {
			title: 'P-Switch',
			description: '',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'CardSlotMachine',
		},
		info: {
			title: 'Card Slot Machine',
			description: 'Touching this completes the level.',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'QuestionMark',
		},
		info: {
			title: 'Question Mark Ball',
			description: 'Touching this completes the level.',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'TriangularBlock',
		},
		info: {
			title: 'Triangular Block',
			description: 'Lets Mario run up walls and ceilings',
		},
	},
];

const terrain: PaletteChoiceModalEntry[] = [
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
			type: 'IndestructibleBrick',
		},
		info: {
			title: 'Indestructible Brick',
			description: 'I always thought these looked like chocolate',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'MusicBlock',
		},
		info: {
			title: 'Music Block',
			description: 'Bouncy bounce, and can also contain items!',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'Muncher',
		},
		info: {
			title: 'Muncher',
			description: 'Small, but mighty.',
		},
	},
];

const items: PaletteChoiceModalEntry[] = [
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
			brushMode: 'entity',
			type: 'AceCoin',
		},
		info: {
			title: 'Ace Coin',
			description:
				'Special coins to search for. At most a level can have five of them.',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'Key',
		},
		info: {
			title: 'Key',
			description: '',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'Bubble',
		},
		info: {
			title: 'Bubble',
			description:
				'Can put things inside of it, need to throw vegetables at it to get at the item.',
		},
	},
];

const gizmos: PaletteChoiceModalEntry[] = [
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
	{
		entry: {
			brushMode: 'entity',
			type: 'FireFlower',
		},
		info: {
			title: 'Fire Flower',
			description: '',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'Leaf',
		},
		info: {
			title: 'Leaf',
			description:
				'Not great on its own, as it just floats off the screen. Probably better inside a brick.',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'CapeFeather',
		},
		info: {
			title: 'Cape Feather',
			description: 'The cape power-up from Super Mario World',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'StarMan',
		},
		info: {
			title: 'Star Man',
			description: 'I can hear the song now...',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'OneUpMushroom',
		},
		info: {
			title: '1up Mushroom',
			description: '',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'ThreeUpMoon',
		},
		info: {
			title: '3up Moon',
			description: '',
		},
	},
];

const bosses: PaletteChoiceModalEntry[] = [
	{
		entry: {
			brushMode: 'entity',
			type: 'BoomBoom',
		},
		info: {
			title: 'Boom Boom',
			description: '',
		},
	},
];

const tabs = [
	'Enemies',
	'Objects',
	'Terrain',
	'Items',
	'Gizmos',
	'Power Ups',
	'Bosses',
];
const entries = [enemies, objects, terrain, items, gizmos, powerUps, bosses];

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
					<div className={clsx(tabStyles.tabs, '-mt-3')}>
						{tabs.map((t, i) => (
							<li
								key={t}
								className={clsx({
									[tabStyles.currentTab]: i === currentTabIndex,
								})}
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
				</div>
			</div>
		</Modal>
	);
};

export { PaletteChoiceModal };
export type { PaletteChoiceModalProps };
