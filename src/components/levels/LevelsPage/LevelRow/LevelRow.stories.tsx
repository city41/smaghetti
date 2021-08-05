import React from 'react';
import { Meta } from '@storybook/react';

import { LevelRow } from './LevelRow';
import { EMPTY_LEVEL } from '../../../editor/editorSlice';

const emptyLevel: Level = {
	created_at: '',
	data: EMPTY_LEVEL,
	id: 'mock-level',
	name: "Chuck's Bomb Store",
	updated_at: '',
	user: {
		username: 'Eukenuba the Third',
	},
};

const meta: Meta = {
	title: 'Levels/LevelRow',
	component: LevelRow,
};

export default meta;

export const Basic = () => {
	return (
		<div className="max-w-2xl mx-auto pt-16">
			<LevelRow
				areFilesReady={true}
				isBuildingSave={false}
				isChosen={false}
				onChosenChange={() => {}}
				level={emptyLevel}
			/>
		</div>
	);
};

export const filesNotReady = () => {
	return (
		<div className="max-w-2xl mx-auto pt-16">
			<LevelRow
				areFilesReady={false}
				isBuildingSave={false}
				isChosen={false}
				onChosenChange={() => {}}
				level={emptyLevel}
			/>
		</div>
	);
};

export const ChosenForSave = () => {
	return (
		<div className="max-w-2xl mx-auto pt-16">
			<LevelRow
				areFilesReady={true}
				isBuildingSave={true}
				isChosen={true}
				onChosenChange={() => {}}
				level={emptyLevel}
			/>
		</div>
	);
};

export const LongLevelName = () => {
	return (
		<div className="max-w-2xl mx-auto pt-16">
			<LevelRow
				areFilesReady={true}
				isBuildingSave={false}
				isChosen={false}
				onChosenChange={() => {}}
				level={{
					...emptyLevel,
					name:
						"go west paradise is there you'll be the brightest light we've ever seen",
				}}
			/>
		</div>
	);
};

export const LongUserName = () => {
	return (
		<div className="max-w-2xl mx-auto pt-16">
			<LevelRow
				areFilesReady={true}
				isBuildingSave={false}
				isChosen={false}
				onChosenChange={() => {}}
				level={{
					...emptyLevel,
					user: {
						username: 'San Andreas Fault Move Your Fingers',
					},
				}}
			/>
		</div>
	);
};
