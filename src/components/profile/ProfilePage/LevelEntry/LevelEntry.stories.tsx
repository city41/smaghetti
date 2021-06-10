import React from 'react';
import { Meta } from '@storybook/react';

import { LevelEntry } from './LevelEntry';
import {
	BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES,
	BACKGROUND_GRAPHIC_VALUES,
	MUSIC_VALUES,
} from '../../../../levelData/constants';

const meta: Meta = {
	title: 'LevelEntry',
	component: LevelEntry,
};

export default meta;

// since storybook does not load the ROM, can't actually render
// entities or tiles, so a blank level is the best we can do
const blankLevel: Level = {
	id: '1',
	created_at: '',
	name: 'Storybook Level',
	data: {
		settings: {
			timer: 0,
		},
		rooms: [
			{
				settings: {
					music: MUSIC_VALUES.Underground,
					bgColor: 0,
					bgGraphic: BACKGROUND_GRAPHIC_VALUES.underground,
					bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
				},
				paletteEntries: [],
				actors: {
					entities: [],
					matrix: [],
				},
				stage: {
					entities: [],
					matrix: [],
				},
				roomTileWidth: 0,
				roomTileHeight: 0,
			},
		],
	},
};

const brokenLevel: BrokenLevel = {
	id: '1',
	created_at: '',
	name: 'Storybook Level',
	broken: true,
};

export const Basic = () => {
	return (
		<div className="inline-block">
			<LevelEntry
				level={blankLevel}
				onDelete={() => {}}
				onEdit={() => {}}
				onDownload={() => {}}
			/>
		</div>
	);
};

export const BrokenLevel = () => {
	return (
		<div className="inline-block">
			<LevelEntry
				level={brokenLevel}
				onDelete={() => {}}
				onEdit={() => {}}
				onDownload={() => {}}
			/>
		</div>
	);
};
