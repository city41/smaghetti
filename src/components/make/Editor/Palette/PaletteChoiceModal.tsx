import React, { ReactNode, useState } from 'react';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';

import { Modal } from '../../../Modal';
import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';

import styles from './PaletteChoiceModal.module.css';
import tabStyles from '../../../../styles/tabs.module.css';
import { EntityType } from '../../../../entities/entityMap';

type PaletteChoiceModalProps = {
	open: boolean;
	currentPaletteEntries: EntityType[];
	onEntryAdded: (addedEntry: EntityType) => void;
	onEntryRemoved: (removedEntry: EntityType) => void;
	onCancel: () => void;
};

type PaletteChoiceModalEntry = {
	entry: EntityType;
	info: { title: string; description: ReactNode; limitationsId?: string };
};

const enemies: PaletteChoiceModalEntry[] = [
	{
		entry: 'Goomba',
		info: {
			title: 'Goomba',
			description: '',
		},
	},
	{
		entry: 'ShoeGoomba',
		info: {
			title: 'Shoe Goomba',
			description: 'Kuribo is the Japanese name for Goombas',
		},
	},
	{
		entry: 'GreenKoopaTroopa',
		info: {
			title: 'Green Koopa Troopa',
			description: 'Walks in a straight line, only turns if hits a wall',
		},
	},
	{
		entry: 'GreenParaTroopa',
		info: {
			title: 'Green Para Troopa',
			description: 'Bounces along',
		},
	},
	{
		entry: 'RedKoopaTroopa',
		info: {
			title: 'Red Koopa Troopa',
			description: 'Turns around at cliffs',
		},
	},
	{
		entry: 'RedParaTroopa',
		info: {
			title: 'Red Para Troopa',
			description: 'Flies up and down',
		},
	},
	{
		entry: 'Spiny',
		info: {
			title: 'Spiny',
			description: '',
		},
	},
	{
		entry: 'BuzzyBeetle',
		info: {
			title: 'Buzzy Beetle',
			description: '',
		},
	},
	{
		entry: 'Bobomb',
		info: {
			title: 'Bobomb',
			description: '',
		},
	},
	{
		entry: 'Lakitu',
		info: {
			title: 'Lakitu',
			description: "Dammit it's Lakitu!",
		},
	},
];

const terrain: PaletteChoiceModalEntry[] = [
	{
		entry: 'Brick',
		info: {
			title: 'Brick',
			description: 'Flexible, can be terrain, smashed, and contain items',
		},
	},
	{
		entry: 'IndestructibleBrick',
		info: {
			title: 'Indestructible Brick',
			description: 'I always thought these looked like chocolate',
		},
	},
	{
		entry: 'WoodBlock',
		info: {
			title: 'Wood Brick',
			description: '',
		},
	},
	{
		entry: 'MusicBlock',
		info: {
			title: 'Music Block',
			description: 'Bouncy bounce, and can also contain items!',
		},
	},
	{
		entry: 'Muncher',
		info: {
			title: 'Muncher',
			description: 'Small, but mighty.',
		},
	},
	{
		entry: 'Stalactite',
		info: {
			title: 'Stalactite',
			description: '',
		},
	},
];

const objects: PaletteChoiceModalEntry[] = [
	{
		entry: 'Coin',
		info: {
			title: 'Coin',
			description: 'The ever present coin',
		},
	},
	{
		entry: 'AceCoin',
		info: {
			title: 'Ace Coin',
			description:
				'Special coins to search for. At most a level can have five of them.',
		},
	},
	{
		entry: 'Key',
		info: {
			title: 'Key',
			description: '',
		},
	},
	// pulling bubble out for now, it's pretty broken needs more research
	// {
	// 	entry: 'Bubble',
	// 	info: {
	// 		title: 'Bubble',
	// 		description:
	// 			'Can put things inside of it, need to throw vegetables at it to get at the item.',
	// 	},
	// },
	{
		entry: 'QuestionBlock',
		info: {
			title: 'Question Block',
			description: 'Can contain a coin, power up or other things',
		},
	},
	{
		entry: 'HiddenBlock',
		info: {
			title: 'Hidden Block',
			description: 'Pretty much an invisible Question Block',
		},
	},
	{
		entry: 'CardSlotMachine',
		info: {
			title: 'Card Slot Machine',
			description: 'Touching this completes the level.',
		},
	},
	{
		entry: 'QuestionMark',
		info: {
			title: 'Question Mark Ball',
			description: 'Touching this completes the level.',
		},
	},
	{
		entry: 'TriangularBlock',
		info: {
			title: 'Triangular Block',
			description: 'Lets Mario run up walls and ceilings',
		},
	},
	{
		entry: 'ArrowSign',
		info: {
			title: 'Arrow Sign',
			description: 'Shows the way to go ... or not go?',
		},
	},
	{
		entry: 'QuestionBlock',
		info: {
			title: 'Question Block',
			description: 'Can contain a coin, power up or other things',
		},
	},
	{
		entry: 'HiddenBlock',
		info: {
			title: 'Hidden Block',
			description: 'Pretty much an invisible Question Block',
		},
	},
	{
		entry: 'CardSlotMachine',
		info: {
			title: 'Card Slot Machine',
			description: 'Touching this completes the level.',
		},
	},
	{
		entry: 'QuestionMark',
		info: {
			title: 'Question Mark Ball',
			description: 'Touching this completes the level.',
		},
	},
	{
		entry: 'TriangularBlock',
		info: {
			title: 'Triangular Block',
			description: 'Lets Mario run up walls and ceilings',
		},
	},
	{
		entry: 'ArrowSign',
		info: {
			title: 'Arrow Sign',
			description: 'Shows the way to go ... or not go?',
		},
	},
];

const gizmos: PaletteChoiceModalEntry[] = [
	{
		entry: 'SpringBoard',
		info: {
			title: 'Spring Board',
			description: 'Bounce high. Pick it up and move it if needed.',
		},
	},
	{
		entry: 'PSwitch',
		info: {
			title: 'P-Switch',
			description: '',
		},
	},
];

const powerUps: PaletteChoiceModalEntry[] = [
	{
		entry: 'Mushroom',
		info: {
			title: 'Mushroom',
			description: '',
		},
	},
	{
		entry: 'FireFlower',
		info: {
			title: 'Fire Flower',
			description: '',
		},
	},
	{
		entry: 'Leaf',
		info: {
			title: 'Leaf',
			description:
				'Not great on its own, as it just floats off the screen. Probably better inside a brick.',
		},
	},
	{
		entry: 'CapeFeather',
		info: {
			title: 'Cape Feather',
			description: 'The cape power-up from Super Mario World',
		},
	},
	{
		entry: 'StarMan',
		info: {
			title: 'Star Man',
			description: 'I can hear the song now...',
		},
	},
	{
		entry: 'OneUpMushroom',
		info: {
			title: '1up Mushroom',
			description: '',
		},
	},
	{
		entry: 'ThreeUpMoon',
		info: {
			title: '3up Moon',
			description: '',
		},
	},
];

const bosses: PaletteChoiceModalEntry[] = [
	{
		entry: 'BoomBoom',
		info: {
			title: 'Boom Boom',
			description: '',
		},
	},
];

const transports: PaletteChoiceModalEntry[] = [
	{
		entry: 'Transport',
		info: {
			title: 'Warp',
			description: (
				<div className="space-y-4">
					<p>These enable Mario to warp someplace else</p>
					<p>
						Place them on top of doors then click to decide where the door goes
					</p>
				</div>
			),
		},
	},
	{
		entry: 'WoodDoor',
		info: {
			title: 'Wood Door',
			description: '',
		},
	},
	{
		entry: 'TexturedDoor',
		info: {
			title: 'Textured Door',
			description: '',
		},
	},
];

const tabs = [
	'Enemies',
	'Terrain',
	'Objects',
	'Gizmos',
	'Power Ups',
	'Bosses',
	'Transports',
];
const entries = [
	enemies,
	terrain,
	objects,
	gizmos,
	powerUps,
	bosses,
	transports,
];

function PaletteChoiceModal({
	open,
	currentPaletteEntries,
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
}

export { PaletteChoiceModal };
export type { PaletteChoiceModalProps };
