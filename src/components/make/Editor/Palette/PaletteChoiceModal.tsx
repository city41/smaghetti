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
			type: 'grass',
		},
		info: {
			title: 'Grass',
			description: 'Player can stand on it, and jump up through from below.',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'metal',
		},
		info: {
			title: 'Steel',
			description: 'Solid and indestructible',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'spike',
		},
		info: {
			title: 'Spikes',
			description: 'Instant death!',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'ladder',
		},
		info: {
			title: 'Ladder',
			description: 'Climb up and down',
		},
	},
];

const enemies: PaletteChoiceModalEntry[] = [
	{
		entry: {
			brushMode: 'entity',
			type: 'GusGus',
		},
		info: {
			title: 'GusGus',
			description:
				'Basic enemy, easily stomped on. Will turn around instead of falling off a cliff.',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'Skrusher',
		},
		info: {
			title: 'Skrusher',
			description: 'Comes crashing down when the player is near.',
		},
	},
];

const items: PaletteChoiceModalEntry[] = [
	{
		entry: {
			brushMode: 'entity',
			type: 'Box',
		},
		info: {
			title: 'Box',
			description: 'Player can stand on it. But it can be destroyed too...',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'Coin',
		},
		info: {
			title: 'Coin',
			description: 'Good for ... points, I guess?',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'Arrow',
		},
		info: {
			title: 'Arrow',
			description: 'Point something out to the player.',
		},
	},
];

const gizmos: PaletteChoiceModalEntry[] = [
	{
		entry: {
			brushMode: 'entity',
			type: 'Cannon',
		},
		info: {
			title: 'Cannon',
			description:
				'Excels at launching the player at high velocity. Once loaded, press jump to launch.',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'AutoCannon',
		},
		info: {
			title: 'Auto-Cannon',
			description:
				'Just like Cannon, but automatically launches the player once loaded.',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'Spring',
		},
		info: {
			title: 'Spring',
			description: 'Bouncing around the room',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'conveyor',
		},
		info: {
			title: 'Conveyor Belt',
			description: 'Kick back and let the floor do the walking.',
		},
	},
];

const electricGizmos: PaletteChoiceModalEntry[] = [
	{
		entry: {
			brushMode: 'entity',
			type: 'OnOff',
		},
		info: {
			title: 'Switch',
			description:
				'Turns electricity on or off. All of the items in this section change their behavior when electricity is toggled.',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'PlusBlock',
		},
		info: {
			title: 'Plus Block',
			description: 'Solid when electricity is on',
		},
	},
	{
		entry: {
			brushMode: 'entity',
			type: 'MinusBlock',
		},
		info: {
			title: 'Minus Block',
			description: 'Solid when electricity is off',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'electroMagneticWall',
		},
		info: {
			title: 'Electro-Magnetic Wall',
			description:
				'Player can cling to it and wall jump from it when electricity is on.',
		},
	},
	{
		entry: {
			brushMode: 'tile',
			type: 'reverseGravityBlock',
		},
		info: {
			title: 'Gravity Zone',
			description:
				'Create a zone out of these. When electricity is on, gravity is reversed in that zone.',
		},
	},
];

const powerUps: PaletteChoiceModalEntry[] = [
	{
		entry: {
			brushMode: 'entity',
			type: 'Feather',
		},
		info: {
			title: 'Feather',
			description: 'Slow your descent by holding the jump button',
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
