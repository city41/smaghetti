import React from 'react';
import { Meta } from '@storybook/react';

import { LevelEntry } from './LevelEntry';
import {
	PLAY_WINDOW_TILE_HEIGHT,
	PLAY_WINDOW_TILE_WIDTH,
} from '../../../make/constants';

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
	level_play_sessions: [],
	name: 'Storybook Level',
	data: {
		entities: [],
		tileLayer: {
			width: PLAY_WINDOW_TILE_WIDTH * 3,
			height: PLAY_WINDOW_TILE_HEIGHT * 1.5,
			data: [[]],
		},
	},
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
