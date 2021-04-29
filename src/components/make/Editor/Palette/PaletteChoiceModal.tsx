import React, { ReactNode, useState } from 'react';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';

import { Modal } from '../../../Modal';
import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';

import styles from './PaletteChoiceModal.module.css';
import tabStyles from '../../../../styles/tabs.module.css';
import { entityMap, EntityType } from '../../../../entities/entityMap';

type PaletteChoiceModalProps = {
	isOpen: boolean;
	currentPaletteEntries: EntityType[];
	onEntryAdded: (addedEntry: EntityType) => void;
	onEntryRemoved: (removedEntry: EntityType) => void;
	onCancel: () => void;
	currentGraphicSet: number;
	currentObjectSet: number;
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
		entry: 'ParaGoomba',
		info: {
			title: 'Para Goomba',
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
	{
		entry: 'Boo',
		info: {
			title: 'Boo',
			description: '',
		},
	},
	{
		entry: 'BonyBeetle',
		info: {
			title: 'Bony Beetle',
			description: '',
		},
	},
	{
		entry: 'Thwomp',
		info: {
			title: 'Thwomp',
			description: '',
		},
	},
	{
		entry: 'Thwimp',
		info: {
			title: 'Thwimp',
			description: '',
		},
	},
];

const terrain: PaletteChoiceModalEntry[] = [
	{
		entry: 'DiggableSand',
		info: {
			title: 'Diggable Sand',
			description: 'Mario can dig down through it',
		},
	},
	{
		entry: 'ArrowFloor',
		info: {
			title: 'Arrow Floor',
			description: 'Just decoration',
		},
	},
	{
		entry: 'SpikeBall',
		info: {
			title: 'Spike Ball',
			description: '',
		},
	},
	{
		entry: 'Brick',
		info: {
			title: 'Brick',
			description: 'Flexible, can be terrain, smashed, and contain items',
		},
	},
	{
		entry: 'MagicBrick',
		info: {
			title: 'Magic Brick',
			description: 'Pick it up and throw it!',
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
		entry: 'TerracottaBrick',
		info: {
			title: 'Terracotta Brick',
			description: '',
		},
	},
	{
		entry: 'GlassBlock',
		info: {
			title: 'Glass Block',
			description: 'Not slippery',
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
		entry: 'MetalDonutFloor',
		info: {
			title: 'Metal Donut Floor ',
			description: 'Unlike regular donuts, these stay in place',
		},
	},
	{
		entry: 'WoodWalkway',
		info: {
			title: 'Wood Walkway',
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
	{
		entry: 'BuriedVegetable',
		info: {
			title: 'Buried Vegetable',
			description: 'Can pull up all kinds of things! Nice throwback to SMB2.',
		},
	},
	{
		entry: 'FortressBrick',
		info: {
			title: 'Fortress Brick',
			description: '',
		},
	},
	{
		entry: 'Lava',
		info: {
			title: 'Lava',
			description: '',
		},
	},
	{
		entry: 'UpFortressSpike',
		info: {
			title: 'Upward Fortress Spike',
			description: '',
		},
	},
	{
		entry: 'DownFortressSpike',
		info: {
			title: 'Downward Fortress Spike',
			description: '',
		},
	},
	{
		entry: 'FireBarBase',
		info: {
			title: 'Fire Bar Base',
			description: (
				<>
					<p>Normally these are coupled with fire bars</p>
					<p>But it is not required, and Mario can stand on them</p>
				</>
			),
		},
	},
	{
		entry: 'FireBar',
		info: {
			title: 'Fire Bar',
			description: 'round and round we go',
		},
	},
	{
		entry: 'LogBridge',
		info: {
			title: 'Log Bridge',
			description: '',
		},
	},
	{
		entry: 'YellowSwitchBrick',
		info: {
			title: 'Yellow Switch Brick',
			description: 'Only solid while a yellow switch is active',
		},
	},
	{
		entry: 'ConveyorBelt',
		info: {
			title: 'Conveyor Belt',
			description: '',
		},
	},
	{
		entry: 'BowserLaserStatue',
		info: {
			title: 'Bowser Laser Statue',
			description: '',
		},
	},
];

const objects: PaletteChoiceModalEntry[] = [
	{
		entry: 'NumberBlock',
		info: {
			title: 'Number Block',
			description:
				'If the number is greater than zero, Mario can pick it up and spawn a new block',
		},
	},
	{
		entry: 'MetalMushroom',
		info: {
			title: 'Metal Mushroom',
			description: 'Love the SMB2 stuff!',
		},
	},
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
			title: 'Advance Coin',
			description:
				'Special coins to search for. At most a level can have five of them.',
		},
	},
	{
		entry: 'CoinChallenge',
		info: {
			title: 'Coin Challenge',
			description:
				'Once Mario hits this, he is tasked with collecting a certain amount of coins. If he succeeds, he gets 3up.',
		},
	},
	{
		entry: 'Bubble',
		info: {
			title: 'Bubble',
			description:
				'Can put things inside of it, need to throw vegetables at it to get at the item.',
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
	{
		entry: 'Chest',
		info: {
			title: 'Chest',
			description:
				'Contain a power up. Mario finishes the level upon opening it.',
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
	{
		entry: 'YellowSwitch',
		info: {
			title: 'Yellow Switch',
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
		entry: 'Key',
		info: {
			title: 'Key',
			description: 'Use to unlock a door',
		},
	},
	{
		entry: 'SimpleBlackDoor',
		info: {
			title: 'Simple Black Door',
			description: '',
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

const bastards: PaletteChoiceModalEntry[] = [
	{
		entry: 'GiantGoomba',
		info: {
			title: 'Giant Goomba',
			description: '',
		},
	},
	{
		entry: 'GiantGreenKoopa',
		info: {
			title: 'Giant Green Koopa',
			description: '',
		},
	},
	{
		entry: 'HorizontalRedPiranhaPlant',
		info: {
			title: 'Horizontal Red Piranha Plant',
			description: '',
		},
	},
	{
		entry: 'FlyingPiranhaPlant',
		info: {
			title: 'FPP',
			description: '',
		},
	},
	{
		entry: 'Cactus',
		info: {
			title: 'Cactus',
			description: '',
		},
	},
	{
		entry: 'LakituCloud',
		info: {
			title: 'Lakitu Cloud',
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
	'Warps',
	...(process.env.NODE_ENV === 'production' ? [] : ['Bastards']),
];
const entries = [
	enemies,
	terrain,
	objects,
	gizmos,
	powerUps,
	bosses,
	transports,
	...(process.env.NODE_ENV === 'production' ? [] : [bastards]),
];

function isCompatible(
	type: EntityType,
	objectSet: number,
	graphicSet: number
): boolean {
	const entityDef = entityMap[type];

	const objectSetCompatible =
		!entityDef.objectSets || entityDef.objectSets.includes(objectSet);
	const graphicSetCompatible =
		!entityDef.graphicSets || entityDef.graphicSets.includes(graphicSet);

	return objectSetCompatible && graphicSetCompatible;
}

function getSortComparator(objectSet: number, graphicSet: number) {
	return (a: PaletteChoiceModalEntry, b: PaletteChoiceModalEntry) => {
		const aCompat = isCompatible(a.entry, objectSet, graphicSet);
		const bCompat = isCompatible(b.entry, objectSet, graphicSet);

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
	onEntryAdded,
	onCancel,
	currentObjectSet,
	currentGraphicSet,
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
						{currentEntries
							.sort(getSortComparator(currentObjectSet, currentGraphicSet))
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
										incompatible={
											!isCompatible(
												ce.entry,
												currentObjectSet,
												currentGraphicSet
											)
										}
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
					{currentEntry && (
						<div className="space-y-4">{currentEntry.info.description}</div>
					)}
					{currentEntry &&
						!isCompatible(
							currentEntry.entry,
							currentObjectSet,
							currentGraphicSet
						) && (
							<div className="space-y-3">
								<div className="mt-4 text-red-500 font-bold">
									Incompatible with the current room type.
								</div>
								<div className="text-xs">
									This incompatibility may be temporary. I need to figure out
									more on how the game works here. Stay tuned.
								</div>
							</div>
						)}
				</div>
			</div>
		</Modal>
	);
}

export { PaletteChoiceModal };
export type { PaletteChoiceModalProps };
