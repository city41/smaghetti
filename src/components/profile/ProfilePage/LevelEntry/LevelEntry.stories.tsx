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
	name: 'Storybook Level',
	data: {
		rooms: [
			{
				settings: {
					objectSet: 0,
					objectGraphicSet: 0,
					music: 0,
					bgColor: 0,
					bgGraphic: 0,
					spriteGraphicSet: [0, 0, 0, 0, 0, 0],
				},
				paletteEntries: [],
				entities: [],
				matrixLayer: {
					width: PLAY_WINDOW_TILE_WIDTH * 3,
					height: PLAY_WINDOW_TILE_HEIGHT * 1.5,
					data: [[]],
				},
			},
		],
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
